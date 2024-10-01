<?php

namespace App\Models;

use Illuminate\Support\Facades\Http; // Ensure to import Http facade

use App\Events\cpanelChannel;
use Illuminate\Support\Facades\Storage;
use stdClass;

class cloudflare
{
    protected $CLOUDFLARE_KEY;
    protected $CLOUDFLARE_ID;
    protected $zone_data;
    protected $apiBaseUrl = 'https://api.cloudflare.com/client/v4';

    public function __construct($zone_id)
    {
        $this->CLOUDFLARE_KEY = env('CLOUDFLARE_KEY');
        $this->CLOUDFLARE_ID = env('CLOUDFLARE_ID');
        $this->zone_data = $this->get_domain_data($zone_id);
    }

    public function add_website($domain){
        $response = Http::withToken(env('CLOUDFLARE_KEY'))->post("https://api.cloudflare.com/client/v4/zones", [
            'name'       => $domain,
            'account'    => ['id' => env('CLOUDFLARE_ID')],
            'jump_start' => true,
        ]);
        if($response['success'] == false){
            return false;
        }
        // compareNameservers();
        return $response['result'];
    }
    public function delete_user_domainName($zoneId){
        $response = Http::withToken(env('CLOUDFLARE_KEY'))
        ->delete("{$this->$apiBaseUrl}/{$zoneId}");
        if ($response->failed()) {
            return false;
        }
        return true;
    }
    public function get_domain_data($zone_id){
        $response = Http::withToken(env('CLOUDFLARE_KEY'))->get("https://api.cloudflare.com/client/v4/zones/{$zone_id}");
        if ($response->failed()) {
            return false;
        }
        return $response['result'];
    }
    public function setup_domain(){
        if($this->zone_data['status'] === 'active'){
            if($this->add_dns_records()){
                if($this->set_ssl_settings()){
                    $create_origin_ssl = $this->create_origin_ssl();
                    // if($this->create_origin_ssl()){
                        $cpanel = new stdClass();
                        $cpanel->website_id = 2;
                        $cpanel->code = 'test.test';
                        $cpanel->notification = $create_origin_ssl;
                        broadcast(new cpanelChannel($cpanel));
                    // }
                }
            }
        }
    }
    public function get_dns_records(){
        $dns_response = Http::withToken($this->CLOUDFLARE_KEY)->get("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/dns_records");
        if ($dns_response->successful()) {
            return $dns_response->json()['result'];
        } else {
            return false;
        }
    }
    public function add_dns_records()
    {
        $dns_records = $this->get_dns_records();
        $records_added = false;
        if(!array_filter($dns_records, function ($record) {return $record['type'] === 'A'; })){
            $add_record = Http::withToken($this->CLOUDFLARE_KEY)->post("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/dns_records", [
                'type' => 'A',
                'name' => $this->zone_data['name'],
                'content' => env('SERVER_IP'),
                'ttl' => 1,
                'proxied' => true,
            ]);
            if ($add_record->successful()) {
                if($add_record['success']){
                    $records_added = true;
                }
            }
        }else{
            $records_added = true;
        }
        if(!array_filter($dns_records, function ($record) {return $record['type'] === 'CNAME'; })){
            $add_record = Http::withToken($this->CLOUDFLARE_KEY)->post("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/dns_records", [
                'type' => 'CNAME',
                'name' => 'www',
                'content' => $this->zone_data['name'],
                'ttl' => 1,
                'proxied' => true,
            ]);
            if ($add_record->successful()) {
                    if($add_record['success']){
                    $records_added = true;
                }
            }
        }else{
            $records_added = true;
        }

        return $records_added;
    }
    public function check_ssl_settings(){
        $check_ssl_settings = Http::withToken($this->CLOUDFLARE_KEY)->get("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/settings/ssl");
        return $check_ssl_settings['result'];
    }
    public function set_ssl_settings()
    {
        $ssl_settings = $this->check_ssl_settings();
        if($ssl_settings['value'] === 'strict'){
            return true;
        }
        $set_strict = Http::withToken($this->CLOUDFLARE_KEY)->patch("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/settings/ssl", [
            'value' => 'strict'
        ]);
        if ($set_strict->successful()) {
            if($set_strict['success']){
                return true;
            }
        }else{
            return false;
        }
    }
    public function check_origin_ssl(){
        $zone_certificate = Http::withToken($this->CLOUDFLARE_KEY)->get("https://api.cloudflare.com/client/v4/certificates?zone_id={$this->zone_data['id']}");
        return $zone_certificate->json();
    }
    public function create_origin_ssl(){
        $csr = $this->generate_csr($this->zone_data['name']);
        $store_key = $this->store_private_key($this->zone_data['name'],$csr['private_key']);
        // if(!$store_key){return;}

        $origin_ssl = Http::withToken($this->CLOUDFLARE_KEY)->withHeaders([
            'Content-Type' => 'application/json',
            'X-Auth-User-Service-Key'=> env('CLOUDFLARE_ORIGIN_CA_KEY'),
        ])->post("https://api.cloudflare.com/client/v4/certificates",[
            'hostnames' => [$this->zone_data['name'],"*.{$this->zone_data['name']}"],
            'requested_validity' => 5475,
            'request_type' => 'origin-rsa',
            'csr' => $csr['csr']
        ]);
        $certificate_data = $origin_ssl->json();

        if ($origin_ssl->successful()) {
            if($certificate_data['success'] !== true){return;}
            $certificate = $certificate_data['result']['certificate'];
            // $privateKey = $certificate_data['result']['private_key'];
            // $baseDir = "/var/ssl";
            $this->store_certificate($this->zone_data['name'],$certificate);

            // if (!file_exists($baseDir)) {
            //     mkdir($baseDir, 0755, true);
            // }
            // file_put_contents("$baseDir/{$this->zone_data['name']}.pem", $certificate);
            // file_put_contents("$baseDir/{$this->zone_data['name']}.key", $privateKey);
        }
    }
    public function generate_csr(string $domain): array
    {
        $dn = [
            "commonName" => $domain,
        ];

        // Generate a new private key
        $privateKeyResource = openssl_pkey_new([
            "private_key_bits" => 2048,
            "private_key_type" => OPENSSL_KEYTYPE_RSA,
        ]);

        if (!$privateKeyResource) {
            throw new \Exception('Failed to generate private key: ' . openssl_error_string());
        }

        // Create a temporary OpenSSL config file with SANs
        $sanConfig = [
            'config' => '/tmp/openssl.cnf',
            'digest_alg' => 'sha256',
        ];

        $san = "subjectAltName=DNS:{$domain},DNS:*.{$domain}";

        file_put_contents($sanConfig['config'], "
        [ req ]
        default_bits = 2048
        prompt = no
        default_md = sha256
        req_extensions = req_ext
        distinguished_name = dn

        [ dn ]
        CN = {$domain}

        [ req_ext ]
        {$san}
        ");

        // Generate the CSR with SANs
        $csrResource = openssl_csr_new($dn, $privateKeyResource, $sanConfig);

        if (!$csrResource) {
            throw new \Exception('Failed to generate CSR: ' . openssl_error_string());
        }

        // Export the private key and CSR to strings
        openssl_pkey_export($privateKeyResource, $privateKey);
        openssl_csr_export($csrResource, $csr);

        // Clean up temporary config file
        unlink($sanConfig['config']);

        return [
            'private_key' => $privateKey,
            'csr' => $csr,
        ];
    }
    public function store_private_key(string $domain, string $privateKey)
    {
        $directory = "/var/ssl/{$domain}/";

        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
            chown($directory, posix_getuid());
            chgrp($directory, posix_getgid());
        }
        $filePath = $directory . "/origin.key";
        file_put_contents($filePath, $privateKey);
        // Store the private key
        chmod($filePath, 0600); // Set permissions to owner read/write only
        chown($filePath, posix_getuid());
        chgrp($filePath, posix_getgid());
        // if(file_put_contents($filePath, $privateKey)){
        //     chmod($filePath, 0600); // Set permissions to owner read/write only
        //     chown($filePath, posix_getuid());
        //     return true;
        // }
        // return false;
    }
    public function store_certificate(string $domain, string $certificate)
    {
        // $directory = "/var/ssl";
        $directory = "/var/ssl/{$domain}/";
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
            chown($directory, posix_getuid());
            chgrp($directory, posix_getgid());
        }
        $filePath = $directory . "/origin.pem";
        file_put_contents($filePath, $certificate);
        chmod($filePath, 0644);
        chown($filePath, posix_getuid());
        chgrp($filePath, posix_getgid());
    }

    public function compareNameservers($assigned, $current){
        $current = is_array($current) ? $current : [];

        $assignedLower = array_map('strtolower', $assigned);

        $currentLower = array_map('strtolower', $current);

        return !array_diff($assignedLower, $currentLower);
    }
}
