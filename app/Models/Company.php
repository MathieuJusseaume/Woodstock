<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'phone', 'adress'];

    protected $with = ['users', 'clients', 'orders'];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function clients(): HasMany
    {
        return $this->hasMany(Client::class);
    }
    public function wood()
    {
        return $this->hasOne(Wood::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

}
