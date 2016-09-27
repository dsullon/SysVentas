<?php

class Cliente_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function create($obj)
	{
        $this->db
        ->set(array('apellidos' => $obj["apellidos"], 'nombres' => $obj["nombres"], 'idDocumento' => $obj['documento'], 
            'direccion' => $obj["direccion"], 'telefono1' => $obj["telefono1"], 'telefono2' => $obj["telefono2"], 
            'numeroDocumento' => $obj['numeroDocumento'], 'celular1' => $obj["celular1"], 'celular2' => $obj["celular2"], 
            'email1' => $obj["email1"], 'email2' => $obj["email2"], 'idUbigeo' => $obj["ubigeo"], 'idZona' => $obj["zona"]))
        ->insert('tbl_cliente');
        if ($this->db->affected_rows() === 1) {
           return TRUE;
        }else{
            return FALSE;
        }
	}
}