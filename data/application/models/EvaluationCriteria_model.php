<?php

class EvaluationCriteria_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function getByType($type)
    {
        $query = $this->db
        ->select('*')
        ->from('evaluation_criteria')
        ->where('evaluation_type_id', $type)
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function update($obj)
    {
        $this->db
        ->set(array('name' => strtoupper($obj['name']), 'note' => $obj['note'],
            'evaluation_type_id' => $obj['evaluation_type_id']))
        ->where(array('id' => $obj['id']))
        ->update('evaluation_criteria');
        return $this->db->affected_rows();
        if ($this->db->affected_rows() === 1) {
            return true;
        }
        return null;
    }

    public function create($question)
    {
        $this->db->trans_begin();

        $this->db
        ->set(array('name' => strtoupper($question['name']), "evaluation_type_id" => $question['type'],
            "note" => $question['note'] ))
        ->insert('evaluation_criteria');
        $insert_id = $this->db->insert_id();

        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
        }else
        {
            $query = $this->db
            ->select('*')
            ->from('evaluation_criteria')
            ->where('id', $insert_id)
            ->get();
            if ($query->num_rows() === 1) {
                $this->db->trans_commit();
                return $query->row_array();
            }
        }
    }

    public function delete($id)
    {
        $query = $this->db
        ->where('id', $id)
        ->delete('evaluation_criteria');
        if($query){
            return true;
        }
        return null;
    }
}