<?php
defined("BASEPATH" or die("El acceso al script no está permitido"));

class Employee extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model("employee_model");
	}
    
    public function authUser()
    {
        if($this->input->post("nick"))
        {
            $this->form_validation->set_rules('password', 'password', 'trim|required|xss_clean');
            $this->form_validation->set_rules('nick', 'nick', 'trim|required|xss_clean');
 
            if($this->form_validation->run() === FALSE)
            {
                echo json_encode(array("respuesta" => "Error en la validación de datos."));
            }
            else
            {
                $data = array(
                    'nick' => $this->input->post("nick"),
                    'password' => md5($this->input->post('password'))
                );
 
                $authUser = $this->employee_model->login($data);
                if($authUser !== false)
                {
                    echo json_encode(array("respuesta" => "success","user" => $authUser));
                }
                else
                {
                    echo json_encode(array("respuesta" => "failedProcess"));
                }
            }
        }
        else
        {
            echo json_encode(array("respuesta" => "failederror"));
        }
    }

    public function getToEvaluate($evaluation, $evaluator)
    {
        $data = $this->employee_model->getToEvaluate($evaluation, $evaluator);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }   
    }

    public function getEvaluatorByEvaluated($evaluation, $evaluated)
    {
        $data = $this->employee_model->getEvaluatorByEvaluated($evaluation, $evaluated);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }   
    }

    public function getEvaluatedByEvaluation($evaluation)
    {
        $data = $this->employee_model->getEvaluatedByEvaluation($evaluation);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }   
    }

    public function get($id)
    {
        if($id && is_numeric($id))
        {
            $data = $this->employee_model->get($id);
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


    public function getAll()
    {
    	echo json_encode($this->employee_model->get());
    }
}

//Location: application/controllers/BlogController.php