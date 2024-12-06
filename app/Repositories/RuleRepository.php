<?php

namespace App\Repositories;

use App\Models\Rule;
use App\Repositories\BaseRepository;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\AllowedFilter;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class RuleRepository extends BaseRepository
{
    protected $allowedFilters = [];
    protected $allowedSorts = [];
    protected $with = ['subreddit'];

    public function __construct(Rule $model)
    {
        parent::__construct($model);

        $this->allowedFilters = [
            AllowedFilter::scope('title'),
            AllowedFilter::scope('content'),
        ];

        $this->allowedSorts = [
            AllowedSort::field('title')
        ];
    }

      

    

 
    
   
    public function updateRule($id, array $data)
    {
        try {
            $rule = Rule::findOrFail($id);
            $rule->update($data);

            return $rule;
        } catch (ModelNotFoundException $e) {
            return ['error' => 'Post no encontrado'];
        }
    }


    public function destroy($id)
    {
            $post = Rule::findOrFail($id); 
            $post->delete();

            return ['message' => 'Post eliminado correctamente', 'status' => 200];
    }
}
