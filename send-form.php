<?php
declare(strict_types=1);

const RECIPIENT_EMAIL = 'info@elranchopauto.com';
const FROM_EMAIL = 'info@elranchopauto.com';
const FROM_NAME = 'El Rancho P Auto Website';
const SITE_NAME = 'El Rancho P Auto';

function wants_json(): bool
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    return stripos($accept, 'application/json') !== false;
}

function request_lang(): string
{
    return post_value('language', 20) === 'es' ? 'es' : 'en';
}

function text_for(string $key): string
{
    $lang = request_lang();
    $copy = [
        'en' => [
            'method' => 'This endpoint only accepts form submissions.',
            'success' => 'Thank you. Your request was sent successfully. Our team will contact you soon.',
            'success_quiet' => 'Thank you. Your message was sent successfully.',
            'rate_limit' => 'Too many submissions. Please wait a few minutes and try again.',
            'invalid_form' => 'The form could not be processed. Please call us directly.',
            'send_failed' => 'We could not send your request right now. Please call us at (281) 832-5630.',
            'name_required' => 'Name is required.',
            'email_invalid' => 'Please enter a valid email address.',
            'email_required' => 'Email is required.',
            'message_required' => 'Message is required.',
            'phone_required' => 'Phone is required.',
            'phone_invalid' => 'Please enter a valid phone number.',
            'date_invalid' => 'Please enter a valid preferred date.',
            'date_past' => 'Preferred date cannot be in the past.',
            'service_invalid' => 'Please select a valid service.',
            'spam_links' => 'Please remove extra links and try again.',
        ],
        'es' => [
            'method' => 'Este endpoint solo acepta envios de formulario.',
            'success' => 'Gracias. Tu solicitud fue enviada correctamente. Nuestro equipo se comunicara contigo pronto.',
            'success_quiet' => 'Gracias. Tu mensaje fue enviado correctamente.',
            'rate_limit' => 'Demasiados envios. Espera unos minutos e intenta de nuevo.',
            'invalid_form' => 'No pudimos procesar el formulario. Por favor llamanos directamente.',
            'send_failed' => 'No pudimos enviar tu solicitud en este momento. Por favor llamanos al (281) 832-5630.',
            'name_required' => 'El nombre es obligatorio.',
            'email_invalid' => 'Ingresa un correo valido.',
            'email_required' => 'El correo es obligatorio.',
            'message_required' => 'El mensaje es obligatorio.',
            'phone_required' => 'El telefono es obligatorio.',
            'phone_invalid' => 'Ingresa un telefono valido.',
            'date_invalid' => 'Ingresa una fecha preferida valida.',
            'date_past' => 'La fecha preferida no puede estar en el pasado.',
            'service_invalid' => 'Selecciona un servicio valido.',
            'spam_links' => 'Elimina enlaces adicionales e intenta de nuevo.',
        ],
    ];

    return $copy[$lang][$key] ?? $copy['en'][$key] ?? $key;
}

function respond(bool $ok, string $message, int $status = 200): void
{
    http_response_code($status);

    if (wants_json()) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_SLASHES);
        return;
    }

    header('Content-Type: text/html; charset=UTF-8');
    $title = $ok ? 'Message sent' : 'Message not sent';
    $safeTitle = escape_html($title);
    $safeMessage = escape_html($message);
    $lang = request_lang();
    echo <<<HTML
<!doctype html>
<html lang="{$lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{$safeTitle} - El Rancho P Auto</title>
  <style>
    body{font-family:Arial,sans-serif;background:#f7f4f2;color:#262122;margin:0;padding:40px}
    main{max-width:620px;margin:0 auto;background:#fff;border:1px solid #e7e3e0;border-radius:12px;padding:32px}
    a{color:#d81e26}
  </style>
</head>
<body>
  <main>
    <h1>{$safeTitle}</h1>
    <p>{$safeMessage}</p>
    <p><a href="index.html">Back to the website</a></p>
  </main>
</body>
</html>
HTML;
}

function post_value(string $key, int $maxLength = 2000): string
{
    $value = $_POST[$key] ?? '';
    if (is_array($value)) {
        $value = '';
    }

    $value = str_replace("\0", '', (string) $value);
    $value = trim($value);

    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }

    return substr($value, 0, $maxLength);
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function clean_header(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

function encoded_subject(string $subject): string
{
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($subject, 'UTF-8', 'B', "\r\n");
    }

    return '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

function client_ip(): string
{
    $raw = $_SERVER['REMOTE_ADDR'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? 'unknown';
    $parts = explode(',', (string) $raw);
    return trim($parts[0]) ?: 'unknown';
}

function rate_limit_dir(): ?string
{
    $candidates = [
        dirname(__DIR__) . DIRECTORY_SEPARATOR . '.elranchopauto-form-rate',
        rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'elranchopauto-form-rate',
    ];

    foreach ($candidates as $dir) {
        if (is_dir($dir) || @mkdir($dir, 0700, true)) {
            return $dir;
        }
    }

    return null;
}

function rate_limit_allows(string $ip): bool
{
    $dir = rate_limit_dir();
    if ($dir === null) {
        return true;
    }

    $file = $dir . DIRECTORY_SEPARATOR . hash('sha256', $ip) . '.json';
    $now = time();
    $windowSeconds = 10 * 60;
    $maxSubmissions = 8;
    $hits = [];

    if (is_file($file)) {
        $decoded = json_decode((string) @file_get_contents($file), true);
        if (is_array($decoded)) {
            $hits = array_values(array_filter($decoded, static function ($timestamp) use ($now, $windowSeconds): bool {
                return is_int($timestamp) && $timestamp > ($now - $windowSeconds);
            }));
        }
    }

    if (count($hits) >= $maxSubmissions) {
        return false;
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);

    return true;
}

function request_origin_allowed(): bool
{
    $allowed = ['elranchopauto.com', 'www.elranchopauto.com', '127.0.0.1', 'localhost'];
    $source = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
    if ($source === '') {
        return true;
    }

    $host = parse_url($source, PHP_URL_HOST);
    return is_string($host) && in_array(strtolower($host), $allowed, true);
}

function phone_is_valid(string $phone): bool
{
    if ($phone === '') {
        return true;
    }

    return strlen(preg_replace('/\D+/', '', $phone)) >= 7;
}

function preferred_date_is_valid(string $date): bool
{
    if ($date === '') {
        return true;
    }

    $parsed = DateTimeImmutable::createFromFormat('!Y-m-d', $date, new DateTimeZone('America/Chicago'));
    return $parsed instanceof DateTimeImmutable && $parsed->format('Y-m-d') === $date;
}

function preferred_date_is_past(string $date): bool
{
    if ($date === '' || !preferred_date_is_valid($date)) {
        return false;
    }

    $zone = new DateTimeZone('America/Chicago');
    $today = new DateTimeImmutable('today', $zone);
    $parsed = DateTimeImmutable::createFromFormat('!Y-m-d', $date, $zone);

    return $parsed instanceof DateTimeImmutable && $parsed < $today;
}

function service_is_valid(string $service): bool
{
    if ($service === '') {
        return true;
    }

    $allowed = [
        'Mechanical Repair',
        'Body & Paint',
        'State Inspection',
        'General Diagnostics',
        'Preventive Maintenance',
        'Oil & Filter Change',
        'Brakes',
        'Suspension & Steering',
        'Air Conditioning',
        'Other / Not sure',
    ];

    return in_array($service, $allowed, true);
}

function has_too_many_links(string $value): bool
{
    preg_match_all('~(?:https?://|www\.)~i', $value, $matches);
    return count($matches[0]) > 2;
}

function load_mail_config(): ?array
{
    $paths = [
        dirname(__DIR__) . DIRECTORY_SEPARATOR . 'form-mail-config.php',
        __DIR__ . DIRECTORY_SEPARATOR . 'form-mail-config.php',
    ];

    foreach ($paths as $path) {
        if (is_readable($path)) {
            $config = require $path;
            return is_array($config) ? $config : null;
        }
    }

    return null;
}

function format_multiline(string $value): string
{
    return nl2br(escape_html($value), false);
}

function build_html_email(string $heading, array $fields, array $meta): string
{
    $rows = '';
    foreach ($fields as $label => $value) {
        if ($value === '') {
            continue;
        }

        $safeLabel = escape_html($label);
        $safeValue = format_multiline((string) $value);
        $rows .= <<<HTML
          <tr>
            <td style="padding:12px 14px;border-bottom:1px solid #eee;color:#6b6360;width:34%;font-weight:700;">{$safeLabel}</td>
            <td style="padding:12px 14px;border-bottom:1px solid #eee;color:#262122;">{$safeValue}</td>
          </tr>
HTML;
    }

    $metaRows = '';
    foreach ($meta as $label => $value) {
        if ($value === '') {
            continue;
        }

        $safeLabel = escape_html($label);
        $safeValue = escape_html((string) $value);
        $metaRows .= <<<HTML
          <tr>
            <td style="padding:8px 0;color:#8a817d;width:34%;">{$safeLabel}</td>
            <td style="padding:8px 0;color:#5c5552;">{$safeValue}</td>
          </tr>
HTML;
    }

    $safeHeading = escape_html($heading);

    return <<<HTML
<!doctype html>
<html>
<body style="margin:0;background:#f7f4f2;padding:0;font-family:Arial,Helvetica,sans-serif;color:#262122;">
  <div style="display:none;max-height:0;overflow:hidden;">New website submission from El Rancho P Auto.</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f4f2;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #e7e3e0;border-radius:14px;overflow:hidden;">
          <tr>
            <td style="background:#1a1718;padding:26px 30px;">
              <div style="color:#ffffff;font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;">El Rancho P Auto</div>
              <h1 style="margin:10px 0 0;color:#ffffff;font-size:25px;line-height:1.25;font-family:Georgia,'Times New Roman',serif;">{$safeHeading}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 30px 10px;">
              <p style="margin:0 0 18px;color:#5c5552;font-size:15px;line-height:1.6;">A visitor submitted this request from the website. Reply directly to this email if a customer email was provided.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #eee;border-radius:10px;overflow:hidden;">
{$rows}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 30px 28px;">
              <h2 style="font-size:14px;color:#1a1718;margin:0 0 8px;text-transform:uppercase;letter-spacing:.1em;">Submission details</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
{$metaRows}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;
}

function build_text_email(string $heading, array $fields, array $meta): string
{
    $lines = [SITE_NAME, $heading, str_repeat('-', 42), ''];

    foreach ($fields as $label => $value) {
        if ($value !== '') {
            $lines[] = $label . ': ' . $value;
        }
    }

    $lines[] = '';
    $lines[] = 'Submission details';
    $lines[] = str_repeat('-', 42);

    foreach ($meta as $label => $value) {
        if ($value !== '') {
            $lines[] = $label . ': ' . $value;
        }
    }

    return implode("\n", $lines) . "\n";
}

function send_email(string $subject, string $htmlBody, string $textBody, ?string $replyTo): bool
{
    $boundary = 'erp_' . bin2hex(random_bytes(12));
    $config = load_mail_config();
    $fromEmail = clean_header((string) ($config['from_email'] ?? FROM_EMAIL));
    $fromName = clean_header((string) ($config['from_name'] ?? FROM_NAME));
    $from = $fromName . ' <' . $fromEmail . '>';
    $replyTo = $replyTo ? clean_header($replyTo) : FROM_EMAIL;

    $headers = [
        'From: ' . $from,
        'Reply-To: ' . $replyTo,
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'X-Mailer: PHP/' . PHP_VERSION,
    ];

    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $textBody . "\r\n";
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $htmlBody . "\r\n";
    $body .= "--{$boundary}--\r\n";

    if ($config) {
        return smtp_send($config, RECIPIENT_EMAIL, $subject, $headers, $body);
    }

    $params = '-f' . $fromEmail;
    $sent = @mail(RECIPIENT_EMAIL, encoded_subject($subject), $body, implode("\r\n", $headers), $params);
    if (!$sent) {
        error_log('El Rancho P Auto form mail() failed. SMTP config is missing.');
        $sent = @mail(RECIPIENT_EMAIL, encoded_subject($subject), $body, implode("\r\n", $headers));
    }

    return $sent;
}

function smtp_send(array $config, string $to, string $subject, array $headers, string $body): bool
{
    $host = (string) ($config['host'] ?? '');
    $port = (int) ($config['port'] ?? 465);
    $encryption = strtolower((string) ($config['encryption'] ?? 'ssl'));
    $username = (string) ($config['username'] ?? '');
    $password = (string) ($config['password'] ?? '');
    $fromEmail = clean_header((string) ($config['from_email'] ?? FROM_EMAIL));

    if ($host === '' || $username === '' || $password === '' || $fromEmail === '') {
        error_log('El Rancho P Auto SMTP config is incomplete.');
        return false;
    }

    $remote = ($encryption === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port;
    $socket = @stream_socket_client($remote, $errno, $errstr, 20, STREAM_CLIENT_CONNECT);
    if (!$socket) {
        error_log('El Rancho P Auto SMTP connection failed: ' . $errstr);
        return false;
    }

    stream_set_timeout($socket, 20);

    try {
        smtp_expect($socket, [220]);
        smtp_command($socket, 'EHLO elranchopauto.com', [250]);

        if ($encryption === 'tls') {
            smtp_command($socket, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('SMTP STARTTLS negotiation failed.');
            }
            smtp_command($socket, 'EHLO elranchopauto.com', [250]);
        }

        smtp_command($socket, 'AUTH LOGIN', [334]);
        smtp_command($socket, base64_encode($username), [334]);
        smtp_command($socket, base64_encode($password), [235]);
        smtp_command($socket, 'MAIL FROM:<' . $fromEmail . '>', [250]);
        smtp_command($socket, 'RCPT TO:<' . $to . '>', [250, 251]);
        smtp_command($socket, 'DATA', [354]);

        $message = "To: {$to}\r\n";
        $message .= 'Subject: ' . encoded_subject($subject) . "\r\n";
        $message .= implode("\r\n", $headers) . "\r\n\r\n";
        $message .= $body;
        $message = preg_replace("/\r\n\./", "\r\n..", $message);

        fwrite($socket, $message . "\r\n.\r\n");
        smtp_expect($socket, [250]);
        smtp_command($socket, 'QUIT', [221]);
        fclose($socket);

        return true;
    } catch (Throwable $exception) {
        error_log('El Rancho P Auto SMTP send failed: ' . $exception->getMessage());
        fclose($socket);
        return false;
    }
}

function smtp_command($socket, string $command, array $expectedCodes): string
{
    fwrite($socket, $command . "\r\n");
    return smtp_expect($socket, $expectedCodes);
}

function smtp_expect($socket, array $expectedCodes): string
{
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (preg_match('/^\d{3} /', $line)) {
            break;
        }
    }

    if ($response === '') {
        throw new RuntimeException('SMTP server did not respond.');
    }

    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $expectedCodes, true)) {
        throw new RuntimeException('Unexpected SMTP response: ' . trim($response));
    }

    return $response;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, text_for('method'), 405);
    exit;
}

if (post_value('website', 200) !== '') {
    respond(true, text_for('success_quiet'));
    exit;
}

if (!request_origin_allowed()) {
    respond(false, text_for('invalid_form'), 403);
    exit;
}

$ip = client_ip();
if (!rate_limit_allows($ip)) {
    respond(false, text_for('rate_limit'), 429);
    exit;
}

$formType = post_value('form_type', 40);
if (!in_array($formType, ['appointment', 'contact'], true)) {
    respond(false, text_for('invalid_form'), 422);
    exit;
}

$name = post_value('name', 120);
$phone = post_value('phone', 60);
$email = post_value('email', 180);
$message = post_value('message', 2000);
$replyTo = null;
$errors = [];

if ($name === '') {
    $errors[] = text_for('name_required');
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = text_for('email_invalid');
} elseif ($email !== '') {
    $replyTo = $email;
}

if (!phone_is_valid($phone)) {
    $errors[] = text_for('phone_invalid');
}

if (has_too_many_links($message)) {
    $errors[] = text_for('spam_links');
}

if ($formType === 'appointment') {
    if ($phone === '') {
        $errors[] = text_for('phone_required');
    }

    $vehicle = post_value('vehicle', 180);
    $service = post_value('service', 120);
    $date = post_value('date', 40);
    if (!service_is_valid($service)) {
        $errors[] = text_for('service_invalid');
    }
    if (!preferred_date_is_valid($date)) {
        $errors[] = text_for('date_invalid');
    } elseif (preferred_date_is_past($date)) {
        $errors[] = text_for('date_past');
    }

    $heading = 'New appointment request';
    $subject = '[El Rancho P Auto] Appointment request from ' . ($name ?: 'website visitor');
    $fields = [
        'Full name' => $name,
        'Phone' => $phone,
        'Email' => $email,
        'Vehicle' => $vehicle,
        'Service needed' => $service,
        'Preferred date' => $date,
        'How can we help?' => $message,
    ];
} else {
    if ($email === '') {
        $errors[] = text_for('email_required');
    }
    if ($message === '') {
        $errors[] = text_for('message_required');
    }

    $heading = 'New contact message';
    $subject = '[El Rancho P Auto] Contact message from ' . ($name ?: 'website visitor');
    $fields = [
        'Name' => $name,
        'Phone' => $phone,
        'Email' => $email,
        'Message' => $message,
    ];
}

if ($errors) {
    respond(false, implode(' ', $errors), 422);
    exit;
}

$meta = [
    'Submitted at' => gmdate('Y-m-d H:i:s') . ' UTC',
    'Source page' => post_value('page_url', 300),
    'Language' => post_value('language', 20),
    'IP address' => $ip,
];

$htmlBody = build_html_email($heading, $fields, $meta);
$textBody = build_text_email($heading, $fields, $meta);

if (!send_email($subject, $htmlBody, $textBody, $replyTo)) {
    respond(false, text_for('send_failed'), 500);
    exit;
}

respond(true, text_for('success'));
