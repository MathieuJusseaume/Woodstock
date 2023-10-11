<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DeliveryStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name'
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the ID of the delivery status based on the label.
     *
     * @param string $label The label of the delivery status to look for.
     * @return int|null The ID of the matching delivery status, or null if not found.
     */
    public static function getDeliveryStatusIdForName($name)
    {
        return self::where('name', $name)->value('id');
    }
}
