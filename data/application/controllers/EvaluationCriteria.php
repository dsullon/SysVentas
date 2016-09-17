<?php
defined("BASEPATH" or die("El acceso al script no está permitido"));

class EvaluationCriteria extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model("evaluationCriteria_model");
	}

    public function getbytype($type)
    {
        if($type && is_numeric($type))
        {
            $data = $this->evaluationCriteria_model->getByType($type);
            if($data){
                header("HTTP/1.1 200 OK");
                echo json_encode($data );
            }else{
                header("HTTP/1.1 404 Not Found");
                echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
            } 
        }else{
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("respuesta" => "failederror", 'data' => $this->input->post()));
        } 
    }

    public function update()		
    {
        if($this->input->post('criteria'))
        {
            $success = $this->evaluationCriteria_model->update($this->input->post('criteria'));		
            if($success)		
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

    public function create()		
    {
        if($this->input->post('name') && $this->input->post('type'))
        {
            $data = array(
                'name' => $this->input->post('name'),
                'note' => $this->input->post('note'),
                'type' => $this->input->post('type')
            );
            $addnew = $this->evaluationCriteria_model->create($data);		
            if($addnew)		
            {
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success", "data" => $addnew));		
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

    public function delete()		
    {
        if($this->input->post('id'))
        {
            $delete = $this->evaluationCriteria_model->delete($this->input->post('id'));		
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