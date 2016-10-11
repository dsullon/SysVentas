<?php

class Pago_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get($id = null)
    {
        if (!is_null($id)) {
            $query = $this->db
            ->select("p.id, p.fecha, p.numero, p.idFactura, f.numero as factura, f.fechaFactura, p.montoFactura,
                idCliente,CONCAT(c.apellidos,', ', c.nombres) AS cliente, p.montoPagar, p.cuotaInicial, p.numeroCuotas,
                p.interesAnual, p.cuotaMensual")
            ->from('tbl_pago p')
            ->join('tbl_factura as f', 'p.idFactura = f.id')
            ->join('tbl_cliente as c', 'f.idCliente = c.id')
            ->where('p.id', $id)
            ->get();
            if ($query->num_rows() === 1) {
                return $query->row_array();
            }
            return null;
        }
        $query = $this->db
        ->select("p.id, p.fecha, p.numero, p.idFactura, f.numero as factura, f.fechaFactura, p.montoFactura,
            idCliente,CONCAT(c.apellidos,', ', c.nombres) AS cliente, p.montoPagar, p.cuotaInicial, p.numeroCuotas,
            p.interesAnual, p.cuotaMensual")
        ->from('tbl_pago p')
        ->join('tbl_factura as f', 'p.idFactura = f.id')
        ->join('tbl_cliente as c', 'f.idCliente = c.id')
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function getDetail($id)
    {
        $query = $this->db
        ->select("*")
        ->from('tbl_detalle')
        ->where('idPago', $id)
        ->order_by('fecha', 'ASC')
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
        ->select('COALESCE(MAX(item),0) as numero')
        ->from('tbl_detalle')
        ->where('idPago', $obj['pago'])
        ->get();
        if($query){
            $item = $query->row()->numero + 1;
        }else{
            log_message('ERROR','No se pudo generar el correlativo.');
            return FALSE;
        }

        $fecha = date("Y-m-d");

        $this->db
         ->set(array('idPago' => $obj['pago'], 'item' => $item, 'fecha' => $fecha, 
                'monto' => $obj['montoPagar'], 'tipo' => '1'))
        ->insert('tbl_detalle');

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return FALSE;
        }else{
            $this->db->trans_commit();
            return $item;
        }
	}
}