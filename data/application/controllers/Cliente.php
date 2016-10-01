<?php
defined("BASEPATH" or die("El acceso al script no está permitido"));

class Cliente extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model("cliente_model");
	}

    public function getById($id)
    {
        $data = $this->cliente_model->get($id);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }   
    }

    public function getAll()
    {
        $data = $this->cliente_model->get();
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }
    }

    public function create()
    {
        if($this->input->post("cliente"))
        {
            $addNew = $this->cliente_model->create($this->input->post("cliente"));
            if($addNew)
            { 
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));
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
        if($this->input->post('evaluation'))
        {
            $delete = $this->cliente_model->delete($this->input->post('evaluation'));		
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

    public function evaluate()
    {
        if($this->input->post('evaluation') && $this->input->post('evaluator') && 
        $this->input->post('evaluated') && $this->input->post('question_id'))
        {
            $question = array(
                'evaluation' => $this->input->post('evaluation'),
                'evaluator' => $this->input->post('evaluator'),
                'evaluated' => $this->input->post('evaluated'),
                'question_id' => $this->input->post('question_id'),
                'answer' => $this->input->post('answer')
            );		
            $evaluate = $this->cliente_model->evaluate($question);
            if($evaluate)
            {   
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));
            }
            else
            {   
                header("HTTP/1.1 500 Internal Server Error");                
                echo json_encode(array("respuesta" => "failedProcess", 'data' => $evaluate));
            }
        }
        else
        {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("respuesta" => "Faltan completar datos."));
        }
    }

    public function selfassess()
    {
        if($this->input->post('evaluation') && $this->input->post('evaluated') 
        && $this->input->post('question_id'))
        {
            $question = array(
                'evaluation' => $this->input->post('evaluation'),
                'evaluated' => $this->input->post('evaluated'),
                'question_id' => $this->input->post('question_id'),
                'answer' => $this->input->post('answer')
            );		
            $evaluate = $this->cliente_model->selfassess($question);
            if($evaluate)
            {   
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));
            }
            else
            {   
                header("HTTP/1.1 500 Internal Server Error");                
                echo json_encode(array("respuesta" => "failedProcess", 'data' => $evaluate));
            }
        }
        else
        {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("respuesta" => "Faltan completar datos."));
        }
    }

    public function showToEvaluated()
    {
        if($this->input->post('evaluation'))
        {
            $evaluation = array(
                'evaluation' => $this->input->post('evaluation')
            );		
            $success = $this->cliente_model->showToEvaluated($evaluation);
            if($success)
            {   
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));
            }
            else
            {   
                header("HTTP/1.1 500 Internal Server Error");                
                echo json_encode(array("respuesta" => "failedProcess", 'data' => $evaluate));
            }
        }
        else
        {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("respuesta" => "Faltan completar datos."));
        }
    }

    public function changeStatusToClose()
    {
        if($this->input->post('evaluation'))
        {
            $evaluation = array(
                'evaluation' => $this->input->post('evaluation')
            );		
            $success = $this->cliente_model->changeStatusToClose($evaluation);
            if($success)
            {   
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));
            }
            else
            {   
                header("HTTP/1.1 500 Internal Server Error");                
                echo json_encode(array("respuesta" => "failedProcess", 'data' => $evaluate));
            }
        }
        else
        {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("respuesta" => "Faltan completar datos."));
        }
    }

    public function updatecomment()		
    {
        if($this->input->post('evaluation') && $this->input->post('evaluator') && 
        $this->input->post('evaluated') && $this->input->post('comment'))
        {
            $comment = array(
                'evaluation' => $this->input->post('evaluation'),
                'evaluator' => $this->input->post('evaluator'),
                'evaluated' => $this->input->post('evaluated'),
                'comment' => $this->input->post('comment'),
                'response' => $this->input->post('response')
            );
            $success = $this->cliente_model->updateComment($comment);		
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
}