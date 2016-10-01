<?php
defined("BASEPATH" or die("El acceso al script no está permitido"));

class Proforma extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model("proforma_model");
	}

    public function getById($id)
    {
        $data = $this->proforma_model->get($id);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }   
    }

    public function getAll()
    {
        $data = $this->proforma_model->get();
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }
    }

    public function getNotBilling()
    {
        $data = $this->proforma_model->getNotBilling();
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }
    }

    public function create()
    {
        if($this->input->post("proforma"))
        {
            $addNew = $this->proforma_model->create($this->input->post("proforma"));
            if($addNew)
            { 
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success", 'data' => $addNew));
            }
            else
            {   
                header("HTTP/1.1 500 Internal Server Error");                
                echo json_encode(array("respuesta" => "Error al procesar los datos."));
            }
        }
        else
        {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("respuesta" => "Faltan completar datos."));
        }
    }

    public function delete()		
    {
        if($this->input->post('proforma'))
        {
            $delete = $this->proforma_model->delete($this->input->post('proforma'));		
            if($delete)		
            {
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));		
            }
            else{
                header("HTTP/1.1 500 Internal Server Error");                		
                echo json_encode(array("respuesta" => "Error al procesar los datos"));
            }		
        }
        else		
        {
            header("HTTP/1.1 400 Bad Request");		
            echo json_encode(array("respuesta" => "Faltan completar datos."));		
        }		
    }
}