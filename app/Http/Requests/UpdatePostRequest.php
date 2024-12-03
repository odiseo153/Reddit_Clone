<?php

namespace App\Http\Requests;

use App\Core\Http\Requests\BaseFormRequest;

class UpdatePostRequest extends BaseFormRequest
{

    public function authorize(): bool
    {
        return true;
    }




    public function rules(): array
    {
        return [
            'title' => 'string|max:255',
            'content' => 'string',
            'subreddit_id' => 'integer|exists:subreddits,id', 
            'user_id' => 'integer|exists:users,id' 
        ];
    }
}
