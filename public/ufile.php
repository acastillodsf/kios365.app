<?php
 header('Access-Control-Allow-Origin: *');
 header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
 header("Access-Control-Allow-Headers: X-API-KEY, x-auth-domain, x-auth-token,Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
 header('Content-Type: application/json');
 $method = $_SERVER['REQUEST_METHOD'];
 if ($method == "OPTIONS") {  
 header('Access-Control-Allow-Origin: *');
 header("Access-Control-Allow-Headers: X-API-KEY, x-auth-domain, x-auth-token,Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
 header("HTTP/1.1 200 OK");
 die();
 } 
 class Extractor {

    /**
     * Checks file extension and calls suitable extractor functions.
     *
     * @param $archive
     * @param $destination
     */
    public static function extract($archive, $destination){
        $ext = pathinfo($archive, PATHINFO_EXTENSION);
        switch ($ext){
            case 'zip':
                $res = self::extractZipArchive($archive, $destination);
                break;
            case 'gz':

                $res = self::extractGzipFile($archive, $destination);
                break;
            case 'rar':

                $res = self::extractRarArchive($archive, $destination);
                break;
        }

        return $res;
    }
    
    /**
     * Decompress/extract a zip archive using ZipArchive.
     *
     * @param $archive
     * @param $destination
     */
    public static function extractZipArchive($archive, $destination){
        // Check if webserver supports unzipping.
        if(!class_exists('ZipArchive')){
            $GLOBALS['status'] = array('error' => 'Your PHP version does not support unzip functionality.');
            return false;
        }
    
        $zip = new ZipArchive;
    
        // Check if archive is readable.
        if($zip->open($archive) === TRUE){
            // Check if destination is writable
            if(is_writeable($destination . '/')){
                $zip->extractTo($destination);
                $zip->close();
                $GLOBALS['status'] = array('success' => 'Files unzipped successfully');
                return true;
            }else{
                $GLOBALS['status'] = array('error' => 'Directory not writeable by webserver.');
                return false;
            }
        }else{
            $GLOBALS['status'] = array('error' => 'Cannot read .zip archive.');
            return false;
        }
    }
    
    /**
     * Decompress a .gz File.
     *
     * @param $archive
     * @param $destination
     */
    public static function extractGzipFile($archive, $destination){
        // Check if zlib is enabled
        if(!function_exists('gzopen')){
            $GLOBALS['status'] = array('error' => 'Error: Your PHP has no zlib support enabled.');
            return false;
        }
    
        $filename = pathinfo($archive, PATHINFO_FILENAME);
        $gzipped = gzopen($archive, "rb");

        $file = fopen($filename, "w");
    
        while ($string = gzread($gzipped, 4096)) {
            fwrite($file, $string, strlen($string));
        }
        gzclose($gzipped);

        fclose($file);
    
        // Check if file was extracted.
        if(file_exists($destination.'/'.$filename)){
            $GLOBALS['status'] = array('success' => 'File unzipped successfully.');
            return true;
        }else{
            $GLOBALS['status'] = array('error' => 'Error unzipping file.');
            return false;
        }
    }
    
    /**
     * Decompress/extract a Rar archive using RarArchive.
     *
     * @param $archive
     * @param $destination

     */
    public static function extractRarArchive($archive, $destination){
        // Check if webserver supports unzipping.
        if(!class_exists('RarArchive')){
            $GLOBALS['status'] = array('error' => 'Your PHP version does not support .rar archive functionality.');
            return false;
        }
        // Check if archive is readable.
        if($rar = RarArchive::open($archive)){

            // Check if destination is writable
            if (is_writeable($destination . '/')) {
                $entries = $rar->getEntries();
                foreach ($entries as $entry) {
                    $entry->extract($destination);
                }
                $rar->close();
                $GLOBALS['status'] = array('success' => 'File extracted successfully.');
                return true;
            }else{
                $GLOBALS['status'] = array('error' => 'Directory not writeable by webserver.');
                return false;
            }
        }else{
            $GLOBALS['status'] = array('error' => 'Cannot read .rar archive.');
            return false;
        }
    }
    
}

$header = apache_request_headers();
$data = json_decode(file_get_contents('php://input'), true); 

if(!isset($header['Authorization']) ){
    echo 'Authorization not found';
    return ;
}
if($header['Authorization']<>'Bearer bGS6lzFqvvS5Q8ALbOxatm8/Vk7mLQyzqaS34Q4oR1ew=' ){
    echo 'Token no autorizado';
    return ;
}
//Bearer bGS6lzFqvvSQ8ALbOxatm8/Vk7mLQyzqaS34Q4oR1ew=



 if(isset( $data['filename'])){

    $file_name = 'tmp_'.date('YMD').'.zip';
    if(file_put_contents( $file_name,file_get_contents($data['filename']))) {
        echo "File downloaded successfully.  ";
    }
    else {
        echo "File downloading failed.  ";
        http_response_code(500);
        return ;
    }

    $extractor = new Extractor;

    // Path of archive file
    $archivePath = __DIR__ . '/'.$file_name;

    // Destination path
    $destPath = __DIR__ . '/';

    // Extract archive file
    $extract = $extractor->extract($archivePath, $destPath);

    if($extract){
        echo $GLOBALS['status']['success'];
    }else{
        echo $GLOBALS['status']['error'];
        http_response_code(500);
        return ;
    }
    unlink($archivePath);
    http_response_code(200);


    
 }else{
     echo 'Parametro no encontrado';
     http_response_code(500);

 }








?>
