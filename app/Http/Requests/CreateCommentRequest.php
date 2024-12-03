<?php

namespace App\Http\Requests;

use App\Core\Http\Requests\BaseFormRequest;

class CreateCommentRequest extends BaseFormRequest
{

    public function authorize(): bool
    {
        return true;
    }




    public function rules(): array
    {
        return [
            'content' => 'required|string',
            'post_id' => 'required|string|exists:posts,id', 
            'user_id' => 'required|string|exists:users,id' 
        ];
    }
}
