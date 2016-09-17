<?php

class QuestionTemplate_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function getByType($type)
    {
        $query = $this->db
        ->select('q.id, q.description, q.evaluation_criteria_id, q.question_type')
        ->from('question_template as q')
        ->join('evaluation_criteria as ec', 'q.evaluation_criteria_id = ec.id')
        ->where('ec.evaluation_type_id', $type)
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function update($question)
    {
        $this->db
        ->set(array('description' => $question['description']))
        ->where(array('id' => $question['id']))
        ->update('question_template');
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
        ->set(array('description' => $question['description'], "evaluation_criteria_id" => $question['criteria'],
            "question_type" => $question['type'] ))
        ->insert('question_template');
        $insert_id = $this->db->insert_id();

        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
        }else
        {
            $query = $this->db
            ->select('q.id, q.description, q.evaluation_criteria_id, q.question_type')
            ->from('question_template as q')
            ->where('q.id', $insert_id)
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
        ->delete('question_template');
        if($query){
            return true;
        }
        return null;
    }
}