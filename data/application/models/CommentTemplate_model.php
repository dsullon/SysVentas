<?php

class CommentTemplate_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function getByType($type)
    {
        $query = $this->db
        ->select('c.id, c.description, response_type_id as response_type, r.name as response_name, 
            c.evaluation_type_id as evaluation_type, c.comment_type')
        ->from('comment_template as c')
        ->join('response_type as r', 'c.response_type_id = r.id')
        ->where('c.evaluation_type_id', $type)
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function update($comment)
    {
        $this->db
        ->set(array('description' => $comment['description']))
        ->where(array('id' => $comment['id']))
        ->update('comment_template');
        return $this->db->affected_rows();
        if ($this->db->affected_rows() === 1) {
            return true;
        }
        return null;
    }

    public function create($comment)
    {
        $this->db->trans_begin();

        $this->db
        ->set(array('description' => $comment['description'], "response_type_id" => $comment['response'],
            'evaluation_type_id' => $comment['evaluation'], 'comment_type' => $comment['type'] ))
        ->insert('comment_template');
        $insert_id = $this->db->insert_id();

        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
        }else
        {
            $query = $this->db
            ->select('c.id, c.description, response_type_id as response_type, r.name as response_name, 
                c.evaluation_type_id as evaluation_type, c.comment_type')
            ->from('comment_template as c')
            ->join('response_type as r', 'c.response_type_id = r.id')
            ->where('c.id', $insert_id)
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
        ->delete('comment_template');
        if($query){
            return true;
        }
        return null;
    }
}