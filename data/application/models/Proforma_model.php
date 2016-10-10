<?php

class Proforma_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get($id = null)
    {
        if (!is_null($id)) {
            $query = $this->db
            ->select("p.id, fechaProforma, numero, descripcion, idEmpleado, idCliente, 
                idLote, p.precioM2, p.precioTotal, facturado, l.codigo, l.area,
                CONCAT(c.apellidos,', ', c.nombres) AS cliente, e.usuario")
            ->from('tbl_proforma p')
            ->join('tbl_lote as l', 'p.idLote = l.id')
            ->join('tbl_cliente as c', 'p.idCliente = c.id')
            ->join('tbl_empleado as e', 'p.idEmpleado = e.id')
            ->where('p.id', $id)->get();
            if ($query->num_rows() === 1) {
                return $query->row_array();
            }
            return null;
        }
        $query = $this->db
        ->select("p.id, fechaProforma, numero, descripcion, idEmpleado, idCliente, 
            idLote, p.precioM2, p.precioTotal, facturado, l.codigo, l.area,
            CONCAT(c.apellidos,', ', c.nombres) AS cliente, e.usuario")
        ->from('tbl_proforma p')
        ->join('tbl_lote as l', 'p.idLote = l.id')
        ->join('tbl_cliente as c', 'p.idCliente = c.id')
        ->join('tbl_empleado as e', 'p.idEmpleado = e.id')
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function getNotBilling()
    {
        $query = $this->db
        ->select("p.id, fechaProforma, numero, descripcion, idEmpleado, idCliente, 
            idLote, p.precioM2, p.precioTotal, facturado, l.codigo, l.area,
            CONCAT(c.apellidos,', ', c.nombres) AS cliente, e.usuario")
        ->from('tbl_proforma p')
        ->join('tbl_lote as l', 'p.idLote = l.id')
        ->join('tbl_cliente as c', 'p.idCliente = c.id')
        ->join('tbl_empleado as e', 'p.idEmpleado = e.id')
        ->where('p.facturado', '0')
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
        ->select('COALESCE(MAX(numero),0) as numero')
        ->from('tbl_proforma')
        ->get();
        if($query){
            $codigo = $query->row()->numero + 1;
            $codigo = str_repeat("0", 6 - strlen($codigo)).$codigo;
        }else{
            log_message('ERROR','No se pudo generar el correlativo.');
            return FALSE;
        }

        $this->db
        ->set(array('numero' => $codigo, 'descripcion' => $obj["descripcion"], 
            'idEmpleado' => $obj["empleado"], 'idCliente' => $obj["cliente"], 'idLote' => $obj["lote"], 
            'precioM2' => $obj['precioMt2'], 'precioTotal' => $obj["precio"]))
        ->insert('tbl_proforma');

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return FALSE;
        }else{
            $this->db->trans_commit();
            return $codigo;
        }
	}
}