<?php

class Factura_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get($id = null)
    {
        if (!is_null($id)) {
            $query = $this->db
            ->select("p.id, fechaFactura, numero, idEmpleado, idCliente, idLote, p.precioM2, p.precioTotal, 
                pagado, l.codigo, l.area, CONCAT(c.apellidos,', ', c.nombres) AS cliente, e.usuario")
            ->from('tbl_factura p')
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
        ->select("p.id, fechaFactura, numero, idEmpleado, idCliente, idLote, p.precioM2, p.precioTotal, 
            pagado, l.codigo, l.area, CONCAT(c.apellidos,', ', c.nombres) AS cliente, e.usuario")
        ->from('tbl_factura p')
        ->join('tbl_lote as l', 'p.idLote = l.id')
        ->join('tbl_cliente as c', 'p.idCliente = c.id')
        ->join('tbl_empleado as e', 'p.idEmpleado = e.id')
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function create($obj)
	{
        $this->db->trans_begin();

        $fecha = date("Y-m-d");

        $query = $this->db
        ->select('COALESCE(MAX(numero),0) as numero')
        ->from('tbl_factura')
        ->get();
        if($query){
            $codigo = $query->row()->numero + 1;
            $codigo = str_repeat("0", 6 - strlen($codigo)).$codigo;
        }else{
            log_message('ERROR','No se pudo generar el correlativo de la factura.');
            return FALSE;
        }

        $this->db
        ->set(array('numero' => $codigo, 'fechaFactura' => $fecha, 'precioM2' => $obj['precioMt2'],
            'precioTotal' => $obj["total"], 'porIgv' => $obj['porcentajeIGV'], 'montoIgv' => $obj['igv'],
            'porDcto' => $obj['porcentajeDCTO'], 'montoDcto' => $obj['descuento'], 'descripcion' => $obj["descripcion"],
            'idEmpleado' => $obj["empleado"], 'idCliente' => $obj["cliente"], 'idLote' => $obj["lote"], 
            'idProforma' => $obj['proforma']))
        ->insert('tbl_factura');
         $id = $this->db->insert_id();

        $query = $this->db
        ->select('COALESCE(MAX(numero),0) as numero')
        ->from('tbl_pago')
        ->get();
        if($query){
            $codigo = $query->row()->numero + 1;
            $codigo = str_repeat("0", 8 - strlen($codigo)).$codigo;
        }else{
            log_message('ERROR','No se pudo generar el correlativo del pago.');
            return FALSE;
        }

        $this->db
        ->set(array('numero' => $codigo, 'fecha' => $fecha, 'montoFactura' => $obj['total'], 'cuotaInicial' => $obj['inicial'], 
            'montoPagar' => $obj['montoPendiente'], 'numeroCuotas' => $obj['cuotas'],
            'interesAnual' => $obj['interesAnual'], 'cuotaMensual' => $obj['cuotaMensual'], 
            'idFactura' => $id))
        ->insert('tbl_pago');
        $idPago = $this->db->insert_id();

        for($i = 0; $i < $obj['cuotas']; $i++){
            $this->db
            ->set(array('idPago' => $idPago, 'item' => ($i + 1), 'fecha' => $fecha, 
                'monto' => $obj['cuotaMensual'], 'tipo' => '0'))
            ->insert('tbl_detalle');
            $fecha = date('Y-m-d', strtotime($fecha. ' + 30 days'));
        }

        $totalCuotas = $obj['cuotaMensual'] * $obj['cuotas'];
        $diferencia = $obj['montoPendiente'] - $totalCuotas;

        $this->db
        ->set(array('monto' => $obj['cuotaMensual'] + $diferencia))
        ->where(array('item' => $i, 'idPago' => $idPago))
        ->update('tbl_detalle');

        $this->db
        ->set(array('facturado' => '1'))
        ->where(array('id' => $obj['proforma']))
        ->update('tbl_proforma');

        $this->db
        ->set(array('vendido' => '1'))
        ->where(array('id' => $obj['lote']))
        ->update('tbl_lote');

        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return FALSE;
        }else{
            $this->db->trans_commit();
            return $codigo;
        }
	}
}