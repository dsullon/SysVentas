<?php

if ( !empty( $_FILES ) ) {

    if(isset($_POST["folder"])){
        $folder = $_POST["folder"];
        $uploadPath = '../../images/'. DIRECTORY_SEPARATOR . $folder . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    }else{
        $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    }

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];

    move_uploaded_file( $tempPath, $uploadPath );

    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );

    echo $json;

} else {

    echo 'No files';

}

?>