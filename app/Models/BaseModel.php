<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\Uid\Ulid;

class BaseModel extends Model
{
    use HasFactory, HasUlids;

    // Configurar el tipo de clave primaria
    protected $keyType = 'string';
    public $incrementing = false;

    // Generar un ULID único
    public function newUniqueId(): string
    {
        return (string) Ulid::generate();
    }

    // Formatear fechas
    public function getFormattedCreatedAt()
    {
        return $this->created_at->translatedFormat('l j \d\e F Y \a \l\a\s H:i');
    }

    public function getFormattedUpdatedAt()
    {
        return $this->updated_at->translatedFormat('l j \d\e F Y \a \l\a\s H:i');
    }

    // Mutadores para 'name'
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = trim(strtolower($value));
    }

    public function getNameAttribute($value)
    {
        return ucfirst($value);
    }
}
