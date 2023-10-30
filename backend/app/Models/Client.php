<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Client extends Model
{
    use HasFactory;
    protected $fillable = [
        'last_name',
        'first_name',
        'delivery_address',
        'delivery_zip_code',
        'delivery_city',
        'billing_address',
        'billing_zip_code',
        'billing_city',
        'email',
        'phone',
        'company_id'
    ];

    protected $with = [
       'orders'
    ];


    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
