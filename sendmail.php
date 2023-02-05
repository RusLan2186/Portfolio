<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail ->Charset = 'UTF-8';
$mail ->setLanguage('ru','phpmailer/language/');
$mail ->IsHTML(true);

//  от кого письмо
$mail->setFrom('from@example.com', 'Ruslan');
//  кому отправить
$mail->addAddress('ruslanchikbest@gmail.com'); 
// тема письма
$mail->Subject = 'Добрый день. Это Руслан';

// тело письма

$body = '<h1>Встречайте письмо!</h1>';

if (trim(!empty($_POST['name']))){
   $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if (trim(!empty($_POST['email']))){
   $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}
if (trim(!empty($_POST['message']))){
   $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
}

// прикрепить файл
if (!empty($_FILES['image']['tmp_name'])){
   // путь загрузки файла
   $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
   // грузим файл
   if (copy($_FILES['image']['tmp_name'], $filePath)){
      $fileAttach = $filePath;
      $body.='<p><strong>Фото в приложении</strong>';
      $mail->addAttachment($fileAttach);
   }
}
$mail->Body = $body;

// отправляем
if (!$mail->send()){
   $message = 'Ошибка';
}else{
$message = 'данные отправлены!';
}
$response = ['message => $message'];

header('Content-type: application/json');
echo json_encode($response);

?>
