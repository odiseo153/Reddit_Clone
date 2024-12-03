<?php

namespace App\Http\Requests;

use App\Core\Http\Requests\BaseFormRequest;

class UpdateSubRedditRequest extends BaseFormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:1000',
            'photo' => 'nullable|string',
            'user_id' => 'sometimes|required|exists:users,id',
        ];
    }
}
