<?php

namespace App\Services;

use App\Repositories\RuleRepository;

class RuleService {
    protected $ruleRepository;

    public function __construct(RuleRepository $ruleRepository)
    {
        $this->ruleRepository = $ruleRepository;
    }

    public function ListRules()
    {
        return $this->ruleRepository->index(); 
    }

    public function find($id)
    {
        return $this->ruleRepository->findById($id);
    }

    public function create(array $data)
    {
        return $this->ruleRepository->create($data);
    }

    public function update(array $data, $id)
    {
       return $this->ruleRepository->updateRule( $id,$data);
    }

    public function delete($id)
    {
        return $this->ruleRepository->destroy($id);
    }
}
