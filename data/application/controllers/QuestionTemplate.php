<?php
defined("BASEPATH" or die("El acceso al script no está permitido"));

class QuestionTemplate extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model("questionTemplate_model");
	}

    public function getByType($type)
    {
        $data = $this->questionTemplate_model->getByType($type);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }        
    }

    public function update()		
    {
        if($this->input->post('question'))
        {
            $success = $this->questionTemplate_model->update($this->input->post('question'));		
            if($success)		
            {
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));		
            }
            else{
                header("HTTP/1.1 500 Internal Server Error");                		
                echo json_encode(array("respuesta" => "failedProcess", 'data' => $success));
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
        if($this->input->post('description') && $this->input->post('criteria') && $this->input->post('type')!=null)
        {
            $data = array(
                'description' => $this->input->post('description'),
                'criteria' => $this->input->post('criteria'),
                'type' => $this->input->post('type')
            );
            $addnew = $this->questionTemplate_model->create($data);		
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
            $delete = $this->questionTemplate_model->delete($this->input->post('id'));		
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