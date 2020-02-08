# Expires map
# Ref. https://www.digitalocean.com/community/tutorials/how-to-implement-browser-caching-with-nginx-s-header-module-on-centos-7
map $sent_http_content_type $expires {
    default                    off;
    text/html                  epoch;
    text/css                   max;
    application/javascript     max;
    ~image/                    max;
}

server {
        server_name api.kinetik.cl;

    	#listen [::]:443 ssl http2 ipv6only=on; # not managed by Certbot
	#listen 443 ssl http2;

        listen [::]:443 ssl ipv6only=on; # not managed by Certbot
        listen 443 ssl;

	#ssl on; # not managed by Certbot
    	ssl_certificate /etc/letsencrypt/live/kinetik.cl/fullchain.pem; # managed by Certbot
    	ssl_certificate_key /etc/letsencrypt/live/kinetik.cl/privkey.pem; # managed by Certbot
    	include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    	#ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
	ssl_dhparam /etc/ssl/private/dhparams_4096.pem;

	add_header Strict-Transport-Security "max-age=31536000";

	expires $expires;

	include /etc/nginx/conf.d/api-jmimport.site-conf;
	include /etc/nginx/conf.d/api-caltex-ktp.site-conf;
	include /etc/nginx/conf.d/api-caltex-inf.site-conf;
	include /etc/nginx/conf.d/api-susaron.site-conf;
	include /etc/nginx/conf.d/api-babycenter.site-conf;
	include /etc/nginx/conf.d/api-zsmotor.site-conf;
	include /etc/nginx/conf.d/api-zspwa.site-conf;
	include /etc/nginx/conf.d/api-nsr3b.site-conf;     
	include /etc/nginx/conf.d/api-gournet-py.site-conf;
	include /etc/nginx/conf.d/api-losrobles.site-conf;
	include /etc/nginx/conf.d/api-rrhh01.site-conf;

	proxy_hide_header Upgrade;


}
