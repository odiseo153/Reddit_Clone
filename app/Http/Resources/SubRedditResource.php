<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubRedditResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'type' => 'subreddits',
            'id' => $this->id,
            'attributes' => [
                'name' => $this->name,
            ],
        ];
    }
}
