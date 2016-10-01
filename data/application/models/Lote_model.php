<?php

class Lote_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get($id = null)
    {
        if (!is_null($id)) {
            $query = $this->db
            ->select("*")
            ->from('tbl_lote')
            ->where('e.id', $id)->get();
            if ($query->num_rows() === 1) {
                return $query->row_array();
            }
            return null;
        }
        $query = $this->db
        ->select("*")
        ->from('tbl_lote')
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function create($obj)
	{
        $this->db
        ->set(array('apellidos' => $obj["apellidos"], 'nombres' => $obj["nombres"], 'idDocumento' => $obj['documento'], 
            'direccion' => $obj["direccion"], 'telefono1' => $obj["telefono1"], 'telefono2' => $obj["telefono2"], 
            'numeroDocumento' => $obj['numeroDocumento'], 'celular1' => $obj["celular1"], 'celular2' => $obj["celular2"], 
            'email1' => $obj["email1"], 'email2' => $obj["email2"], 'idUbigeo' => $obj["ubigeo"], 'idZona' => $obj["zona"]))
        ->insert('tbl_cliente');
        log_message('ERROR',$this->db->last_query());
        if ($this->db->affected_rows() === 1) {
           return TRUE;
        }else{
            return FALSE;
        }
	}
}