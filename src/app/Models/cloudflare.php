<?php

namespace App\Models;

use Illuminate\Support\Facades\Http;

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
        if($zone_id !== null){
            $this->zone_data = $this->get_domain_data($zone_id);
        }
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
    public function delete_user_domainName(){
        $response = Http::withToken(env('CLOUDFLARE_KEY'))
        ->delete("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}");
        if ($response->failed()) {
            return false;
        }
        $delete_cert_files = $this->delete_current_cert_files();
        if(!$delete_cert_files){return false;}
        return true;
    }
    public function get_domain_data($zone_id){
        $response = Http::withToken(env('CLOUDFLARE_KEY'))->get("https://api.cloudflare.com/client/v4/zones/{$zone_id}");
        if ($response->failed()) {
            return false;
        }
        return $response['result'];
    }
    public function setup_domain($website_id){
        if($this->zone_data['status'] === 'active'){
            $add_dns_records = $this->add_dns_records();
            if($add_dns_records === true){
                $set_zone_settings = $this->set_zone_settings();
                if($set_zone_settings === true){
                    $create_origin_ssl = $this->create_origin_ssl();
                    if($create_origin_ssl === true){
                        $set_user_domain = website::where('id',$website_id)->update([
                            'url' => $this->zone_data['name'],
                            'user_domainName_data->status' => 'active',
                            'user_domainName_data->email_dns' => false,
                        ]);
                        cron_jobs::where(['website_id'=>$website_id,'type'=>2])->delete();
                        if($set_user_domain){
                            $notification = notification::create([
                                'code' => 'system.domain.active',
                                'seen' => false,
                                'website_id'=> $website_id,
                                'domain'=> $this->zone_data['name'],
                            ]);
                            foodmenuFunctions::notification('system.domain.active',null,['notification' => $notification],$website_id);
                        }
                    }
                }
            }
        }else{
            return false;
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

    public function set_zone_settings()
    {
        $zone_settings_complete = true;
        //ssl settings
        $check_ssl_settings = Http::withToken($this->CLOUDFLARE_KEY)->get("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/settings/ssl");
        if($check_ssl_settings['result']['value'] !== 'strict'){
            $set_strict = Http::withToken($this->CLOUDFLARE_KEY)->patch("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/settings/ssl", [
                'value' => 'strict'
            ]);
            if ($set_strict->successful()) {
                if($set_strict['success'] !== true){
                    $zone_settings_complete =  false;
                }
            }else{
                $zone_settings_complete =  false;
            }
        }
        //always https
        $check_always_https = Http::withToken($this->CLOUDFLARE_KEY)->get("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/settings/always_use_https");
        if($check_always_https['result']['value'] !== 'on'){
            $set_always_https = Http::withToken($this->CLOUDFLARE_KEY)->patch("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/settings/always_use_https",[
                'value' =>'on'
            ]);
            if($set_always_https->successful()){
                if($set_always_https['success'] !== true){
                    $zone_settings_complete =  false;
                }
            }else{
                $zone_settings_complete =  false;
            }
        }
        //auto https Rewrites
        $check_auto_https_rewrites = Http::withToken($this->CLOUDFLARE_KEY)->get("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/settings/automatic_https_rewrites");
        if($check_auto_https_rewrites['result']['value'] !== 'on'){
            $set_auto_https_rewrites = Http::withToken($this->CLOUDFLARE_KEY)->patch("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/settings/automatic_https_rewrites",[
                'value' =>'on'
            ]);
            if($set_auto_https_rewrites->successful()){
                if($set_auto_https_rewrites['success'] !== true){
                    $zone_settings_complete =  false;
                }
            }else{
                $zone_settings_complete =  false;
            }
        }
        //Authenticated Origin Pulls
        $check_authenticated_origin = Http::withToken($this->CLOUDFLARE_KEY)->get("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/settings/tls_client_auth");
        if($check_authenticated_origin['result']['value'] !== 'on'){
            $set_authenticated_origin = Http::withToken($this->CLOUDFLARE_KEY)->patch("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/settings/tls_client_auth",[
                'value' =>'on'
            ]);
            if($set_authenticated_origin->successful()){
                if($set_authenticated_origin['success'] !== true){
                    $zone_settings_complete =  false;
                }
            }else{
                $zone_settings_complete =  false;
            }
        }
        //IP Geolocation
        $check_ip_geolocation = Http::withToken($this->CLOUDFLARE_KEY)->get("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/settings/ip_geolocation");
        if($check_ip_geolocation['result']['value'] !== 'on'){
            $set_ip_geolocation = Http::withToken($this->CLOUDFLARE_KEY)->patch("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/settings/ip_geolocation",[
                'value' =>'on'
            ]);
            if($set_ip_geolocation->successful()){
                if($set_ip_geolocation['success'] !== true){
                    $zone_settings_complete =  false;
                }
            }else{
                $zone_settings_complete =  false;
            }
        }
        //allow WebSockets
        $check_allow_webSockets = Http::withToken($this->CLOUDFLARE_KEY)->get("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/settings/websockets");
        if($check_allow_webSockets['result']['value'] !== 'on'){
            $set_allow_webSockets = Http::withToken($this->CLOUDFLARE_KEY)->patch("https://api.cloudflare.com/client/v4/zones/{$this->zone_data['id']}/settings/websockets",[
                'value' =>'on'
            ]);
            if($set_allow_webSockets->successful()){
                if($set_allow_webSockets['success'] !== true){
                    $zone_settings_complete =  false;
                }
            }else{
                $zone_settings_complete =  false;
            }
        }

        return $zone_settings_complete;
    }
    public function delete_current_cert(){
        $zone_certificates = Http::withToken($this->CLOUDFLARE_KEY)->withHeaders([
            'Content-Type' => 'application/json',
            'X-Auth-User-Service-Key'=> env('CLOUDFLARE_ORIGIN_CA_KEY'),
        ])->get("https://api.cloudflare.com/client/v4/certificates?zone_id={$this->zone_data['id']}");
        if (!$zone_certificates->successful()) {return false;}
        if (count($zone_certificates['result']) === 0){return true;}
        $delete_current_cert = true;
        foreach($zone_certificates['result'] as $cert){
            $delete_zone = Http::withToken($this->CLOUDFLARE_KEY)->withHeaders([
                'Content-Type' => 'application/json',
                'X-Auth-User-Service-Key'=> env('CLOUDFLARE_ORIGIN_CA_KEY'),
            ])->delete("https://api.cloudflare.com/client/v4/certificates/{$cert['id']}");
            if(!$delete_zone->successful()){$delete_current_cert = false;}
            if(!$delete_zone['success']){$delete_current_cert = false;}

        }
        return $delete_current_cert;
    }
    public function delete_current_cert_files(){
        $directory = "/etc/nginx/keys/websites/{$this->zone_data['name']}/";
        if (is_dir($directory)) {
            if(file_exists("{$directory}origin.pem")){
                if(!unlink("{$directory}origin.pem")){
                    return false;
                }
            }
            if(file_exists("{$directory}origin.key")){
                if(!unlink("{$directory}origin.key")){
                    return false;
                }
            }
            if(!rmdir($directory)){
                return false;
            }
        }
        return true;
    }
    public function create_origin_ssl(){
        $delete_current_cert_files = $this->delete_current_cert_files();
        $delete_current_cert = $this->delete_current_cert();
        if($delete_current_cert === false || $delete_current_cert_files === false){return false;}

        $csr = $this->generate_csr($this->zone_data['name']);
        $this->store_private_key($this->zone_data['name'],$csr['private_key']);

        $origin_ssl = Http::withToken($this->CLOUDFLARE_KEY)->withHeaders([
            'Content-Type' => 'application/json',
            'X-Auth-User-Service-Key'=> env('CLOUDFLARE_ORIGIN_CA_KEY'),
        ])->post("https://api.cloudflare.com/client/v4/certificates",[
            'hostnames' => [$this->zone_data['name'],"*.{$this->zone_data['name']}"],
            'requested_validity' => 5475,
            'request_type' => 'origin-rsa',
            'csr' => $csr['csr']
        ]);

        if(!$origin_ssl->successful()){return false;}
        $certificate_data = $origin_ssl->json();
        if($certificate_data['success'] !== true){return;}

        $certificate = $certificate_data['result']['certificate'];
        $this->store_certificate($this->zone_data['name'],$certificate);
        return true;
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
        $directory = "/etc/nginx/keys/websites/{$domain}/";
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
            chown($directory, posix_getuid());
            chgrp($directory, posix_getgid());
        }
        $filePath = $directory . "/origin.key";
        file_put_contents($filePath, $privateKey);
        chmod($filePath, 0600);
        chown($filePath, posix_getuid());
        chgrp($filePath, posix_getgid());
    }
    public function store_certificate(string $domain, string $certificate)
    {
        $directory = "/etc/nginx/keys/websites/{$domain}/";
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
}
