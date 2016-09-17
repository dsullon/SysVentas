<?php

class Usuario_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function login($obj)
	{
		$query = $this->db
        ->select("e.id, e.nombre, e.usuario, p.nombre AS perfil")
        ->from('tbl_usuario as e')
        ->join('tbl_perfil as p', 'e.idPerfil = p.id', 'INNER')
        ->where(array('e.usuario' => $obj['usuario'], 'e.clave' => $obj['password']))
        ->get();
		if (($query->num_rows() === 1)) {
            return $query->row_array();
        }
        return false;
	}
}