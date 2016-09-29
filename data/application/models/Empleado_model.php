<?php

class Empleado_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function login($obj)
	{
		$query = $this->db
        ->select("e.id, CONCAT(e.apellidos,', ', e.nombres) AS nombre, e.usuario, p.nombre AS perfil")
        ->from('tbl_empleado as e')
        ->join('tbl_perfil as p', 'e.idPerfil = p.id', 'INNER')
        ->where(array('e.usuario' => $obj['usuario'], 'e.clave' => $obj['password']))
        ->get();
        log_message('ERROR', $this->db->last_query());
		if (($query->num_rows() === 1)) {
            return $query->row_array();
        }
        return false;
	}
}