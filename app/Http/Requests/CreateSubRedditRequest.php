<?php

namespace App\Http\Requests;

use App\Core\Http\Requests\BaseFormRequest;

class CreateSubRedditRequest extends BaseFormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'photo' => 'nullable|string', // Puedes adaptarlo para subir imágenes si necesitas
            'user_id' => 'required|string|exists:users,id',
        ];
    }
}
