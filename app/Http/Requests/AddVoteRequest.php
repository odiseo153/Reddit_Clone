<?php

namespace App\Http\Requests;

use App\Core\Http\Requests\BaseFormRequest;

class AddVoteRequest extends BaseFormRequest
{

    public function authorize(): bool
    {
        return true;
    }




    public function rules(): array
    {
        return [
            'votable_id' => 'required|string', 
            'votable_type' => 'required|string|in:posts,comments', 
            'user_id' => 'required|exists:users,id', 
            'type' => 'required|in:upvote,downvote'
        ];
    }
}
