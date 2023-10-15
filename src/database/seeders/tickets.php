<?php

namespace Database\Seeders;

use App\Models\ticket;
use App\Models\ticket_msg;
use App\Models\website;
use Carbon\Carbon;
use Faker\Generator;
use Illuminate\Container\Container;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tickets extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    protected $faker;
    public function __construct()
    {
        $this->faker = $this->withFaker();
    }
    protected function withFaker()
    {
        return Container::getInstance()->make(Generator::class);
    }
    public function run()
    {
        $website = website::where('domainName','americandiner')->first();
        for($x = 0; $x <=  random_int(1,3); $x++){
            $ticketTime = random_int(-90,-1);
            $ticket = ticket::create([
                'website_id' => $website->id,
                'code' => random_int(0,8),
                'status' => 0,
                'msg' => $this->faker->paragraph(random_int(4,10)),
                'title' => $this->faker->paragraph(random_int(1,2)),
                'comments' => null,
                'imgs' => '[]',
                'language' => 'en',
                'created_at' => Carbon::now()->addDays($ticketTime)->timestamp,
            ]);
        }
        for($x = 0; $x <=  random_int(1,3); $x++){
            $ticketTime = random_int(-90,-1);
            $ticket = ticket::create([
                'website_id' => $website->id,
                'code' => random_int(0,8),
                'status' => 1,
                'msg' => $this->faker->paragraph(random_int(4,10)),
                'title' => $this->faker->paragraph(random_int(1,2)),
                'comments' => null,
                'imgs' => '[]',
                'language' => 'en',
                'created_at' => Carbon::now()->addDays($ticketTime)->addDays(1)->timestamp,
            ]);
            ticket_msg::create([
                'author' => 1,
                'website_id' => $website->id,
                'admin_id' => 1,
                'ticket_id' => $ticket->id,
                'msg' => $this->faker->paragraph(random_int(4,10)),
                'created_at' => Carbon::now()->addDays($ticketTime)->addDays(1),
            ]);
            ticket_msg::create([
                'website_id' => $website->id,
                'author' => 0,
                'admin_id' => 1,
                'ticket_id' => $ticket->id,
                'msg' => $this->faker->paragraph(random_int(4,10)),
                'created_at' => Carbon::now()->addDays($ticketTime)->addDays(2),
            ]);
        }
        for($x = 0; $x <=  random_int(1,3); $x++){
            $ticketTime = random_int(-90,-1);
            $ticket = ticket::create([
                'website_id' => $website->id,
                'code' => random_int(0,8),
                'status' => 2,
                'msg' => $this->faker->paragraph(random_int(4,10)),
                'title' => $this->faker->paragraph(random_int(1,2)),
                'comments' => null,
                'imgs' => '[]',
                'language' => 'en',
                'created_at' => Carbon::now()->addDays($ticketTime)->addDays(1)->timestamp,
            ]);
            ticket_msg::create([
                'author' => 1,
                'website_id' => $website->id,
                'admin_id' => 1,
                'ticket_id' => $ticket->id,
                'msg' => $this->faker->paragraph(random_int(4,10)),
                'created_at' => Carbon::now()->addDays($ticketTime)->addDays(1),
            ]);
            ticket_msg::create([
                'website_id' => $website->id,
                'author' => 0,
                'admin_id' => 1,
                'ticket_id' => $ticket->id,
                'msg' => $this->faker->paragraph(random_int(4,10)),
                'created_at' => Carbon::now()->addDays($ticketTime)->addDays(2),
            ]);
        }
        for($x = 0; $x <=  random_int(1,3); $x++){
            $ticketTime = random_int(-90,-1);
            $ticket = ticket::create([
                'website_id' => $website->id,
                'code' => random_int(0,8),
                'status' => 3,
                'title' => $this->faker->paragraph(random_int(1,2)),
                'msg' => $this->faker->paragraph(random_int(4,10)),
                'comments' => null,
                'imgs' => '[]',
                'language' => 'en',
                'created_at' => Carbon::now()->addDays($ticketTime)->addDays(1)->timestamp,
            ]);
            ticket_msg::create([
                'author' => 1,
                'website_id' => $website->id,
                'admin_id' => 1,
                'ticket_id' => $ticket->id,
                'msg' => $this->faker->paragraph(random_int(4,10)),
                'created_at' => Carbon::now()->addDays($ticketTime)->addDays(1),
            ]);
            ticket_msg::create([
                'website_id' => $website->id,
                'author' => 0,
                'admin_id' => 1,
                'ticket_id' => $ticket->id,
                'msg' => $this->faker->paragraph(random_int(4,10)),
                'created_at' => Carbon::now()->addDays($ticketTime)->addDays(2),
            ]);
        }
        for($x = 0; $x <=  random_int(1,3); $x++){
            $ticketTime = random_int(-90,-1);
            $ticket = ticket::create([
                'website_id' => $website->id,
                'code' => random_int(0,8),
                'status' => 4,
                'title' => $this->faker->paragraph(random_int(1,2)),
                'msg' => $this->faker->paragraph(random_int(4,10)),
                'comments' => null,
                'imgs' => '[]',
                'language' => 'en',
                'created_at' => Carbon::now()->addDays($ticketTime)->addDays(1)->timestamp,
            ]);
            ticket_msg::create([
                'author' => 1,
                'website_id' => $website->id,
                'admin_id' => 1,
                'ticket_id' => $ticket->id,
                'msg' => $this->faker->paragraph(random_int(4,10)),
                'created_at' => Carbon::now()->addDays($ticketTime)->addDays(1),
            ]);
            ticket_msg::create([
                'author' => 0,
                'website_id' => $website->id,
                'admin_id' => 1,
                'ticket_id' => $ticket->id,
                'msg' => $this->faker->paragraph(random_int(4,10)),
                'created_at' => Carbon::now()->addDays($ticketTime)->addDays(2),
            ]);
        }

    }
}
