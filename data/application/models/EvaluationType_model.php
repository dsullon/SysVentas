<?php

class EvaluationType_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function get($id = null)
    {
        if (!is_null($id)) {
            $query = $this->db->select('*')->from('evaluation_type')->where('id', $id)->get();
            if ($query->num_rows() === 1) {
                return $query->row_array();
            }
            return null;
        }
        $query = $this->db->select('*')->from('evaluation_type')->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function create($obj)
    {
        $this->db->trans_begin();

        $this->db
        ->set(array('name' => strtoupper($obj["name"])))
        ->insert('evaluation_type');
        $insert_id = $this->db->insert_id();

        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
        }else
        {
            $this->db
            ->set(array('name' => 'GENERAL', 'evaluation_type_id' => $insert_id, 'note' => ''))
            ->insert('evaluation_criteria');

            $query = $this->db
            ->select('*')->
            from('evaluation_type')
            ->where('id', $insert_id)
            ->get();
            if ($query->num_rows() === 1) {
                $this->db->trans_commit();
                return $query->row_array();
            }
        }
    }

    public function updateStatus($type)
    {
        $this->db
        ->set(array('has_boss' => $type['status']))
        ->where(array('id' => $type['id']))
        ->update('evaluation_type');
        return $this->db->affected_rows();
        if ($this->db->affected_rows() === 1) {
            return true;
        }
        return null;
    }
}