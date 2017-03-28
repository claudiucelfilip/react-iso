<?php


class ReactIso1
{

    function get($url)
    {
        // Get cURL resource
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url,
            CURLOPT_USERAGENT => 'ReactIso1 PHP cURL Request'
        ));

        $resp = curl_exec($curl);

        curl_close($curl);

        return $resp;
    }
}


$v8js = new V8Js();
$v8js->reactIso1 = new ReactIso1;


$app_source = file_get_contents(dirname(__FILE__) . '/public/foo.js');

$mock = <<< EOT
    var global = {};
    global.global = global;
    console = {log: function() {}};
EOT;


$URL = str_replace('/react-iso1', '', $_SERVER['REQUEST_URI']);
$url_insert = 'var URL = "' . str_replace('/', '/', $URL) . '";';

$js = implode(';', [$url_insert, $mock, $app_source]);


try {
    ob_start();
    $v8js->executeString($js);
    $result = json_decode(ob_get_clean());

?>
    <script>
        var INITIAL_STATE = <?php echo $result->initialState ?>;
    </script>
    <div id="root"><?php echo $result->content ?></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/84/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.0.1/Rx.min.js"></script>
<?php
} catch (V8JsException $e) {

    echo "<pre>";
    echo $e->getMessage();

    echo "</pre>";
    die();
}


