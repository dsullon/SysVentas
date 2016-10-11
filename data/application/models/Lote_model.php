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
        $this->db->trans_begin();

        $query = $this->db
        ->select('COALESCE(MAX(CAST(SUBSTRING(codigo, 3) AS UNSIGNED)),0) as numero')
        ->from('tbl_lote')
        ->get();
        if($query){
            $codigo = $query->row()->numero + 1;
            $codigo = 'LT' . str_repeat("0", 4 - strlen($codigo)).$codigo;
        }else{
            log_message('ERROR','No se pudo generar el correlativo.');
            return FALSE;
        }

        $this->db
        ->set(array('codigo' => $codigo, 'medida1' => $obj["medida1"], 'medida2' => $obj['medida2'], 
            'medida3' => $obj["medida3"], 'medida4' => $obj["medida4"], 'medida5' => $obj["medida5"],
            'area' => $obj["area"], 'precioTotal' => $obj["precio"], 'precioM2' => $obj['precioM2'],
            'registroPredial' => $obj["registroPredial"], 'registroMunicipal' => $obj["registroMunicipal"],
            'memo' => $obj["observacion"]))
        ->insert('tbl_lote');
        $id = $this->db->insert_id();

        if($obj['withImage'] === 'true'){
            $this->db
            ->set(array('urlPlano' => 'images/planos/'.$codigo.$obj["tipoImagen"]))
            ->where(array('id' => $id))
            ->update('tbl_lote');
        }

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return FALSE;
        }else{
            $this->db->trans_commit();
            return $codigo;
        }
	}
}