<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'order_number',
        'order_date',
        'delivery_date',
        'quantity',
        'log_size',
        'order_price',
        'payment_status',
        'delivery_price',
        'user_id',
        'client_id',
        'delivery_status_id',
        'company_id'
    ];
    protected $with = ['deliveryStatus'];
    
    use HasFactory;

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function deliveryStatus()
    {
        return $this->belongsTo(DeliveryStatus::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
