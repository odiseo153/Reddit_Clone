<?php

namespace App\Http\Requests;

use App\Core\Http\Requests\BaseFormRequest;

class CreateRuleRequest extends BaseFormRequest
{

    public function authorize(): bool
    {
        return true;
    }

   


    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'subreddit_id' => 'required|string|exists:subreddits,id', 
        ];
    }
}
