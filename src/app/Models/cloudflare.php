<?php

namespace App\Models;
use Illuminate\Support\Facades\Http; // Ensure to import Http facade


class cloudflare
{
    protected $CLOUDFLARE_KEY;
    protected $CLOUDFLARE_ID;
    protected $apiBaseUrl = 'https://api.cloudflare.com/client/v4';

    public function __construct()
    {
        $this->CLOUDFLARE_KEY = env('CLOUDFLARE_KEY');
        $this->CLOUDFLARE_ID = env('CLOUDFLARE_ID');
    }

    public function add_website($domain){
        $response = Http::withToken(env('CLOUDFLARE_KEY'))->post("{$this->apiBaseUrl}/zones", [
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
        ->delete("https://api.cloudflare.com/client/v4/zones/{$zoneId}");
        if ($response->failed()) {
            return false;
        }
        return true;
    }
    public function get_domain_data($zone_id){
        $response = Http::withToken(env('CLOUDFLARE_KEY'))->get("{$this->apiBaseUrl}/zones/{$zone_id}");
        if ($response->failed()) {
            return false;
        }
        return $response['result'];
        return [
            'id' => $response['result']['id'],
            'status' => $response['result']['status'],
            'name_servers' => $response['result']['name_servers'],
            'original_name_servers' => $response['result']['original_name_servers'],
        ];
    }
    public function get_dns_records($zone_id){
        $dns_response = Http::withToken($this->CLOUDFLARE_KEY)->get("https://api.cloudflare.com/client/v4/zones/{$zone_id}/dns_records");
        if ($dns_response->successful()) {
            return $dns_response->json()['result'];
        } else {
            return false;
        }
    }
    public function add_dns_records($zone_data)
    {
        $dns_records = $this->get_dns_records($zone_data['id']);
        return $dns_records;
        $records_added = false;
        if(!array_filter($dns_records, function ($record) {return $record['type'] === 'A'; })){
            $add_record = Http::withToken($this->CLOUDFLARE_KEY)->post("https://api.cloudflare.com/client/v4/zones/{$zone_data['id']}/dns_records", [
                'type' => 'A',
                'name' => $zone_data['name'],
                'content' => env('SERVER_IP'),
                'ttl' => 1,
                'proxied' => true,
            ]);
            if ($add_record->successful()) {
                $records_added = true;
            }
        }else{
            $records_added = true;
        }
        if(!array_filter($dns_records, function ($record) {return $record['type'] === 'CNAME'; })){
            $add_record = Http::withToken($this->CLOUDFLARE_KEY)->post("https://api.cloudflare.com/client/v4/zones/{$zone_data['id']}/dns_records", [
                'type' => 'CNAME',
                'name' => 'www',
                'content' => $zone_data['name'],
                'ttl' => 1,
                'proxied' => true,
            ]);
            return $add_record->json();
            if ($add_record->successful()) {
                $records_added = true;
            }
        }else{
            $records_added = true;
        }

        return $records_added;
    }
    public function compareNameservers($assigned, $current){
        $current = is_array($current) ? $current : [];

        $assignedLower = array_map('strtolower', $assigned);

        $currentLower = array_map('strtolower', $current);

        return !array_diff($assignedLower, $currentLower);
    }
}
