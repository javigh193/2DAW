# syntax=docker/dockerfile:1

FROM nginx:1.24.0
RUN apt update && apt install -y gcc make imagemagick libpcre3 libpcre3-dev libmagickwand-dev pkg-config curl tar gzip git
RUN git clone https://github.com/cubicdaiya/ngx_small_light.git /tmp/ngx_small_light
RUN curl -sL https://nginx.org/download/nginx-1.24.0.tar.gz | tar xvz -C /tmp
WORKDIR "/tmp/ngx_small_light"
RUN ./setup
WORKDIR "/tmp/nginx-1.24.0"
RUN ./configure --add-dynamic-module=../ngx_small_light --with-compat
RUN make modules
RUN mkdir -p /etc/nginx/modules
RUN cp objs/ngx_http_small_light_module.so /etc/nginx/modules







