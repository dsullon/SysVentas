<?php

class Employee_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function login($access)
	{
		$query = $this->db
        ->select("e.id, CONCAT(e.last_name,', ', e.name) AS name, e.acronym, e.img_url, p.name AS position, pf.name AS profile")
        ->from('employee as e')
        ->join('position as p', 'e.position_id = p.id', 'INNER')
        ->join('profile as pf', 'e.profile_id = pf.id', 'INNER')
        ->where(array('e.acronym' => $access['nick'], 'e.password' => $access['password']))
        ->get();
		if (($query->num_rows() === 1)) {
            return $query->row_array();
        }
        return false;
	}
    
    public function get($id = null)
    {
        if (!is_null($id)) {
            $query = $this->db
            ->select("e.id, CONCAT(e.last_name,', ', e.name) AS name, e.acronym, e.img_url, 
            p.name AS position, a.name as area, e.year")
            ->from('employee as e')
            ->join('position as p', 'e.position_id = p.id', 'INNER')
            ->join('area as a', 'e.area_id = a.id', 'INNER')
            ->where('e.id', $id)->get();
            if ($query->num_rows() === 1) {
                return $query->row_array();
            }
            return null;
        }
        $query = $this->db
        ->select("e.id, CONCAT(e.last_name,', ', e.name) AS name, e.acronym, e.img_url, p.name AS position")
        ->from('employee as e')
        ->join('position as p', 'e.position_id = p.id')
        ->order_by("e.last_name", "asc")
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function getToEvaluate($evaluation, $evaluator)
    {
        $query = $this->db
        ->select("e.id, CONCAT(e.last_name,', ', e.name) AS name, e.acronym, e.img_url, p.name AS position")
        ->from('employee as e')
        ->join('position as p', 'e.position_id = p.id', 'INNER')
        ->join('evaluated as ev', 'ev.evaluated_id = e.id', 'INNER')
        ->where(array('ev.evaluator_id' => $evaluator, 'ev.evaluation_id' => $evaluation))
        ->order_by("e.last_name", "asc")
        ->get();        
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function getEvaluatorByEvaluated($evaluation, $evaluated)
    {
        $query = $this->db
        ->select("e.id, CONCAT(e.last_name,', ', e.name) AS name, e.acronym, e.img_url, p.name AS position")
        ->from('employee as e')
        ->join('position as p', 'e.position_id = p.id', 'INNER')
        ->join('evaluated as ev', 'ev.evaluator_id = e.id', 'INNER')
        ->where(array('ev.evaluated_id' => $evaluated, 'ev.evaluation_id' => $evaluation))
        ->order_by("e.last_name", "asc")
        ->get();        
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function getEvaluatedByEvaluation($evaluation)
    {
        $query = $this->db
        ->distinct()
        ->select("e.id, CONCAT(e.last_name,', ', e.name) AS name, e.acronym, e.img_url, p.name AS position")
        ->from('employee as e')
        ->join('position as p', 'e.position_id = p.id', 'INNER')
        ->join('evaluated as ev', 'ev.evaluated_id = e.id', 'INNER')
        ->where(array('ev.evaluation_id' => $evaluation))
        ->order_by("e.last_name", "asc")
        ->get();        
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }
}