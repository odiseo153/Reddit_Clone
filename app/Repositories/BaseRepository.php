<?php

namespace App\Repositories;

use Spatie\QueryBuilder\QueryBuilder;

class BaseRepository
{
    protected $model;
    protected $allowedFilters = [];
    protected $allowedSorts = [];
    protected $defaultSort = '-updated_at';
    protected $with = [];

    public function __construct($model)
    {
        $this->model = $model;
    }

    public function index()
{
    $per_page = request()->input('per_page', 10);
    $per_page = max(1, min($per_page, 100));

    return QueryBuilder::for($this->model::class)
        ->allowedFilters($this->allowedFilters)
        ->allowedSorts($this->allowedSorts)
        ->defaultSort($this->defaultSort)
        ->with($this->with)
        ->paginate($per_page);
}





    public function create(array $data)
    {
        return $this->model::create($data);
    }

    public function findById($id)
    {
        return $this->model::with($this->with)->find($id);
    }

    public function findByName($name)
    {
        return $this->model::where('name', 'ILIKE', $name)->firstOrFail();
    }

    public function makeSnakeCase($data)
    {
        $snakeCaseData = array_map(function ($item) {
            return array_reduce(array_keys($item), function ($carry, $key) use ($item) {
                // Convert camelCase to snake_case
                $newKey = strtolower(preg_replace('/([a-z])([A-Z])/', '$1_$2', $key));
                $carry[$newKey] = $item[$key];
                return $carry;
            }, []);
        }, $data);

        return $snakeCaseData;
    }
}
