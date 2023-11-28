https://www.youtube.com/watch?v=WnlX7w4lHvM
### docker pull bitnami/kafka ###

Apache Kafka is a distributed streaming platform used for building real-time applications

Apache Kafka packaged by Bitnami
What is Apache Kafka?
Apache Kafka is a distributed streaming platform designed to build real-time pipelines and can be used as a message broker or as a replacement for a log aggregation solution for big data applications.

Overview of Apache Kafka Trademarks: This software listing is packaged by Bitnami. The respective trademarks mentioned in the offering are owned by the respective companies, and use of them does not imply any affiliation or endorsement.

TL;DR
Run the application using Docker Compose
The main folder of this repository contains a functional docker-compose.yml file. Run the application using it as shown below:

curl -sSL https://raw.githubusercontent.com/bitnami/containers/main/bitnami/kafka/docker-compose.yml > docker-compose.yml
docker-compose up -d

Why use Bitnami Images?

Bitnami closely tracks upstream source changes and promptly publishes new versions of this image using our automated systems.

With Bitnami images the latest bug fixes and features are available as soon as possible.

Bitnami containers, virtual machines and cloud images use the same components and configuration approach - making it easy to switch between formats based on your project needs.
All our images are based on minideb a minimalist Debian based container image which gives you a small base container image and the familiarity of a leading Linux distribution.
All Bitnami images available in Docker Hub are signed with Docker Content Trust (DCT). You can use DOCKER_CONTENT_TRUST=1 to verify the integrity of the images.
Bitnami container images are released on a regular basis with the latest distribution packages available.
Looking to use Apache Kafka in production? Try VMware Application Catalog, the enterprise edition of Bitnami Application Catalog.

How to deploy Apache Kafka in Kubernetes?
Deploying Bitnami applications as Helm Charts is the easiest way to get started with our applications on Kubernetes. Read more about the installation in the Bitnami Apache Kafka Chart GitHub repository.

Bitnami containers can be used with Kubeapps for deployment and management of Helm Charts in clusters.

Why use a non-root container?
Non-root container images add an extra layer of security and are generally recommended for production environments. However, because they run as a non-root user, privileged tasks are typically off-limits. Learn more about non-root containers in our docs.

Supported tags and respective Dockerfile links
Learn more about the Bitnami tagging policy and the difference between rolling tags and immutable tags in our documentation page.

You can see the equivalence between the different tags by taking a look at the tags-info.yaml file present in the branch folder, i.e bitnami/ASSET/BRANCH/DISTRO/tags-info.yaml.

Subscribe to project updates by watching the bitnami/containers GitHub repo.

Get this image
The recommended way to get the Bitnami Apache Kafka Docker Image is to pull the prebuilt image from the Docker Hub Registry.

docker pull bitnami/kafka:latest
To use a specific version, you can pull a versioned tag. You can view the list of available versions in the Docker Hub Registry.

docker pull bitnami/kafka:[TAG]
If you wish, you can also build the image yourself by cloning the repository, changing to the directory containing the Dockerfile and executing the docker build command. Remember to replace the APP, VERSION and OPERATING-SYSTEM path placeholders in the example command below with the correct values.

git clone https://github.com/bitnami/containers.git
cd bitnami/APP/VERSION/OPERATING-SYSTEM
docker build -t bitnami/APP:latest .
Persisting your data
If you remove the container all your data and configurations will be lost, and the next time you run the image the database will be reinitialized. To avoid this loss of data, you should mount a volume that will persist even after the container is removed.

Note: If you have already started using your database, follow the steps on backing up and restoring to pull the data from your running container down to your host.

The image exposes a volume at /bitnami/kafka for the Apache Kafka data. For persistence you can mount a directory at this location from your host. If the mounted directory is empty, it will be initialized on the first run.

Using Docker Compose:

This requires a minor change to the docker-compose.yml file present in this repository:

kafka:
  ...
  volumes:
    - /path/to/kafka-persistence:/bitnami/kafka
  ...
NOTE: As this is a non-root container, the mounted files and directories must have the proper permissions for the UID 1001.

Connecting to other containers
Using Docker container networking, an Apache Kafka server running inside a container can easily be accessed by your application containers.

Containers attached to the same network can communicate with each other using the container name as the hostname.

Using the Command Line
In this example, we will create an Apache Kafka client instance that will connect to the server instance that is running on the same docker network as the client.

Step 1: Create a network
docker network create app-tier --driver bridge
Step 2: Launch the Apache Kafka server instance
Use the --network app-tier argument to the docker run command to attach the Apache Kafka container to the app-tier network.

docker run -d --name kafka-server --hostname kafka-server \
    --network app-tier \
    -e KAFKA_CFG_NODE_ID=0 \
    -e KAFKA_CFG_PROCESS_ROLES=controller,broker \
    -e KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093 \
    -e KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT \
    -e KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@kafka-server:9093 \
    -e KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER \
    bitnami/kafka:latest
Step 3: Launch your Apache Kafka client instance
Finally we create a new container instance to launch the Apache Kafka client and connect to the server created in the previous step:

docker run -it --rm \
    --network app-tier \
    bitnami/kafka:latest kafka-topics.sh --list  --bootstrap-server kafka-server:9092
Using a Docker Compose file
When not specified, Docker Compose automatically sets up a new network and attaches all deployed services to that network. However, we will explicitly define a new bridge network named app-tier. In this example we assume that you want to connect to the Apache Kafka server from your own custom application image which is identified in the following snippet by the service name myapp.

version: '2'

networks:
  app-tier:
    driver: bridge

services:
  kafka:
    image: 'bitnami/kafka:latest'
    networks:
      - app-tier
    environment:
      - KAFKA_CFG_NODE_ID=0
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@kafka:9093
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
  myapp:
    image: 'YOUR_APPLICATION_IMAGE'
    networks:
      - app-tier
IMPORTANT:

Please update the YOUR_APPLICATION_IMAGE placeholder in the above snippet with your application image
In your application container, use the hostname kafka to connect to the Apache Kafka server
Launch the containers using:

docker-compose up -d
Configuration
The configuration can easily be setup with the Bitnami Apache Kafka Docker image using the following environment variables:

KAFKA_CERTIFICATE_PASSWORD: Password for certificates. No defaults.
KAFKA_HEAP_OPTS: Apache Kafka's Java Heap size. Default: -Xmx1024m -Xms1024m.
KAFKA_ZOOKEEPER_PROTOCOL: Authentication protocol for Zookeeper connections. Allowed protocols: PLAINTEXT, SASL, SSL, and SASL_SSL. Defaults: PLAINTEXT.
KAFKA_ZOOKEEPER_USER: Apache Kafka Zookeeper user for SASL authentication. No defaults.
KAFKA_ZOOKEEPER_PASSWORD: Apache Kafka Zookeeper user password for SASL authentication. No defaults.
KAFKA_ZOOKEEPER_TLS_KEYSTORE_PASSWORD: Apache Kafka Zookeeper keystore file password and key password. No defaults.
KAFKA_ZOOKEEPER_TLS_TRUSTSTORE_PASSWORD: Apache Kafka Zookeeper truststore file password. No defaults.
KAFKA_ZOOKEEPER_TLS_VERIFY_HOSTNAME: Verify Zookeeper hostname on TLS certificates. Defaults: true.
KAFKA_ZOOKEEPER_TLS_TYPE: Choose the TLS certificate format to use. Allowed values: JKS, PEM. Defaults: JKS.
KAFKA_CFG_LISTENERS: Kafka listeners configuration override. No defaults.
KAFKA_CFG_ADVERTISED_LISTENERS: Kafka advertised.listeners configuration override. No defaults.
KAFKA_CFG_SASL_ENABLED_MECHANISMS: Allowed mechanism when using SASL either for clients, inter broker, or zookeeper comunications. Allowed values: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512 or a comma separated combination of those values. Default: PLAIN,SCRAM-SHA-256,SCRAM-SHA-512. NOTE: KRaft <= 3.4 does not yet support SCRAM mechanisms, so this list will be automatically reduced to only PLAIN SASL mechanism.
KAFKA_TLS_CLIENT_AUTH: Sets the value for ssl.client.auth. Allowed values: required, requested, none. Defaults: required.
KAFKA_TLS_<uppercase_listener_name>_CLIENT_AUTH: Sets the value for listener.name.<listener>.ssl.client.auth used to configure mTLS with SASL. Allowed values: required, requested, none.
KAFKA_TLS_TYPE: Choose the TLS certificate format to use. Allowed values: JKS, PEM. Defaults: JKS.
KAFKA_CLIENT_USERS: Users that will be created into Zookeeper when using SASL for client communications. Separated by commas. Default: user
KAFKA_CLIENT_PASSWORDS: Passwords for the users specified atKAFKA_CLIENT_USERS. Separated by commas. Default: bitnami
KAFKA_CFG_MAX_PARTITION_FETCH_BYTES: The maximum amount of data per-partition the server will return. No defaults.
KAFKA_CFG_MAX_REQUEST_SIZE: The maximum size of a request in bytes. No defaults.
KAFKA_CFG_SASL_MECHANISM_INTER_BROKER_PROTOCOL: SASL mechanism to use for inter broker communications. No defaults. NOTE: KRaft <= 3.4 does not yet support SCRAM mechanisms, so the only supported SASL mechanism in KRaft mode would be PLAIN.
KAFKA_INTER_BROKER_USER: Apache Kafka inter broker communication user. Default: user.
KAFKA_INTER_BROKER_PASSWORD: Apache Kafka inter broker communication password. Default: bitnami.
KAFKA_CFG_SASL_MECHANISM_CONTROLLER_PROTOCOL: SASL mechanism to use for controllers communications. No defaults. NOTE: KRaft <= 3.4 does not yet support SCRAM mechanisms, so the only supported SASL mechanism in KRaft mode would be PLAIN.
KAFKA_CONTROLLER_USER: Apache Kafka controllers communication user. Default: controller_user.
KAFKA_CONTROLLER_PASSWORD: Apache Kafka controllers communication password. Default: bitnami.
KAFKA_CFG_PROCESS_ROLES: Node roles when running in KRaft mode. No defaults.
KAFKA_CFG_NODE_ID: Unique node id, required when running in KRaft mode. No defaults.
KAFKA_CFG_CONTROLLER_QUORUM_VOTERS: Map of id/endpoint information for the set of controller quorum voters in a comma-separated list of {id}@{host}:{port} entries. No defaults.
KAFKA_RAFT_CLUSTER_ID: Kafka cluster ID when using Kafka Raft (KRaft). No defaults.
Additionally, any environment variable beginning with KAFKA_CFG_ will be mapped to its corresponding Apache Kafka key. For example, use KAFKA_CFG_BACKGROUND_THREADS in order to set background.threads or KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE in order to configure auto.create.topics.enable.

docker run --name kafka -e KAFKA_CFG_PROCESS_ROLES ... -e KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE=true bitnami/kafka:latest
or by modifying the docker-compose.yml file present in this repository:

kafka:
  ...
  environment:
    - KAFKA_CFG_AUTO_CREATE_TOPICS_ENABLE=true
  ...
Apache Kafka development setup example
To use Apache Kafka in a development setup, create the following docker-compose.yml file:

version: "3"
services:
  kafka:
    image: 'bitnami/kafka:latest'
    ports:
      - '9092:9092'
    environment:
      - KAFKA_CFG_NODE_ID=0
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@kafka:9093
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
To deploy it, run the following command in the directory where the docker-compose.yml file is located:

docker-compose up -d
Kafka with Zookeeper
Apache Kafka Raft (KRaft) makes use of a new quorum controller service in Kafka which replaces the previous controller and makes use of an event-based variant of the Raft consensus protocol. This greatly simplifies Kafka’s architecture by consolidating responsibility for metadata into Kafka itself, rather than splitting it between two different systems: ZooKeeper and Kafka.

More Info can be found here: https://developer.confluent.io/learn/kraft/

NOTE: According to KIP-833, KRaft is now in a production-ready state.

However, if you want to keep using ZooKeeper, you can use the following configuration:

version: "2"

services:
  zookeeper:
    image: docker.io/bitnami/zookeeper:3.8
    ports:
      - "2181:2181"
    volumes:
      - "zookeeper_data:/bitnami"
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
  kafka:
    image: docker.io/bitnami/kafka:3.4
    ports:
      - "9092:9092"
    volumes:
      - "kafka_data:/bitnami"
    environment:
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
    depends_on:
      - zookeeper

volumes:
  zookeeper_data:
    driver: local
  kafka_data:
    driver: local
Accessing Apache Kafka with internal and external clients
In order to use internal and external clients to access Apache Kafka brokers you need to configure one listener for each kind of client.

To do so, add the following environment variables to your docker-compose:

    environment:
      - KAFKA_CFG_NODE_ID=0
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@<your_host>:9093
+     - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093,EXTERNAL://:9094
+     - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092,EXTERNAL://localhost:9094
+     - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,EXTERNAL:PLAINTEXT,PLAINTEXT:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
And expose the external port:

(the internal, client one can still be used within the docker network)

    ports:
-     - '9092:9092'
+     - '9094:9094'
Note: To connect from an external machine, change localhost above to your host's external IP/hostname and include EXTERNAL://0.0.0.0:9093 in KAFKA_CFG_LISTENERS to allow for remote connections.

Producer and consumer using external client
These clients, from the same host, will use localhost to connect to Apache Kafka.

kafka-console-producer.sh --producer.config /opt/bitnami/kafka/config/producer.properties --bootstrap-server 127.0.0.1:9094 --topic test
kafka-console-consumer.sh --consumer.config /opt/bitnami/kafka/config/consumer.properties --bootstrap-server 127.0.0.1:9094 --topic test --from-beginning
If running these commands from another machine, change the address accordingly.

Producer and consumer using internal client
These clients, from other containers on the same Docker network, will use the kafka container service hostname to connect to Apache Kafka.

kafka-console-producer.sh --producer.config /opt/bitnami/kafka/config/producer.properties --bootstrap-server kafka:9092 --topic test
kafka-console-consumer.sh --consumer.config /opt/bitnami/kafka/config/consumer.properties --bootstrap-server kafka:9092 --topic test --from-beginning
Similarly, application code will need to use bootstrap.servers=kafka:9092

More info about Apache Kafka listeners can be found in this great article

Security
In order to configure authentication, you must configure the Apache Kafka listeners properly. Let's see an example to configure Apache Kafka with SASL_SSL authentication for communications with clients, and SASL authentication for controller-related communications.

The environment variables below should be defined to configure the listeners, and the SASL credentials for client communications:

KAFKA_CFG_LISTENERS=SASL_SSL://:9092,CONTROLLER://:9093
KAFKA_CFG_ADVERTISED_LISTENERS=SASL_SSL://localhost:9092
KAFKA_CLIENT_USERS=user
KAFKA_CLIENT_PASSWORDS=password
KAFKA_CLIENT_LISTENER_NAME=SASL_SSL
KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:SASL_PLAINTEXT,SASL_SSL:SASL_SSL
KAFKA_CFG_SASL_MECHANISM_CONTROLLER_PROTOCOL=PLAIN
KAFKA_CONTROLLER_USER=controller_user
KAFKA_CONTROLLER_PASSWORD=controller_password
You must also use your own certificates for SSL. You can drop your Java Key Stores or PEM files into /opt/bitnami/kafka/config/certs. If the JKS or PEM certs are password protected (recommended), you will need to provide it to get access to the keystores:

KAFKA_CERTIFICATE_PASSWORD=myCertificatePassword

If the truststore is mounted in a different location than /opt/bitnami/kafka/config/certs/kafka.truststore.jks, /opt/bitnami/kafka/config/certs/kafka.truststore.pem, /bitnami/kafka/config/certs/kafka.truststore.jks or /bitnami/kafka/config/certs/kafka.truststore.pem, set the KAFKA_TLS_TRUSTSTORE_FILE variable.

The following script can help you with the creation of the JKS and certificates:

kafka-generate-ssl.sh
Keep in mind the following notes:

When prompted to enter a password, use the same one for all.
Set the Common Name or FQDN values to your Apache Kafka container hostname, e.g. kafka.example.com. After entering this value, when prompted "What is your first and last name?", enter this value as well.
As an alternative, you can disable host name verification setting the environment variable KAFKA_CFG_SSL_ENDPOINT_IDENTIFICATION_ALGORITHM to an empty string.
When setting up a Apache Kafka Cluster (check the "Setting up an Apache Kafka Cluster") for more information), each Apache Kafka broker and logical client needs its own keystore. You will have to repeat the process for each of the brokers in the cluster.
The following docker-compose file is an example showing how to mount your JKS certificates protected by the password certificatePassword123. Additionally it is specifying the Apache Kafka container hostname and the credentials for the client and zookeeper users.

version: '2'

services:
  kafka:
    image: 'bitnami/kafka:latest'
    hostname: kafka.example.com
    ports:
      - '9092'
    environment:
      - KAFKA_CFG_NODE_ID=0
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@kafka:9093
      - KAFKA_CFG_LISTENERS=SASL_SSL://:9092,CONTROLLER://:9093
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:SASL_PLAINTEXT,SASL_SSL:SASL_SSL
      - KAFKA_CFG_ADVERTISED_LISTENERS=SASL_SSL://:9092
      - KAFKA_CLIENT_USERS=user
      - KAFKA_CLIENT_PASSWORDS=password
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
      - KAFKA_CFG_SASL_MECHANISM_CONTROLLER_PROTOCOL=PLAIN
      - KAFKA_CONTROLLER_USER=controller_user
      - KAFKA_CONTROLLER_PASSWORD=controller_password
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=SASL_SSL
      - KAFKA_CFG_SASL_MECHANISM_INTER_BROKER_PROTOCOL=PLAIN
      - KAFKA_INTER_BROKER_USER=controller_user
      - KAFKA_INTER_BROKER_PASSWORD=controller_password
      - KAFKA_CERTIFICATE_PASSWORD=certificatePassword123
      - KAFKA_TLS_TYPE=JKS # or PEM
    volumes:
      # Both .jks and .pem files are supported
      # - './kafka.keystore.pem:/opt/bitnami/kafka/config/certs/kafka.keystore.pem:ro'
      # - './kafka.keystore.key:/opt/bitnami/kafka/config/certs/kafka.keystore.key:ro'
      # - './kafka.truststore.pem:/opt/bitnami/kafka/config/certs/kafka.truststore.pem:ro'
      - './kafka.keystore.jks:/opt/bitnami/kafka/config/certs/kafka.keystore.jks:ro'
      - './kafka.truststore.jks:/opt/bitnami/kafka/config/certs/kafka.truststore.jks:ro'
In order to get the required credentials to consume and produce messages you need to provide the credentials in the client. If your Apache Kafka client allows it, use the credentials you've provided.

While producing and consuming messages using the bitnami/kafka image, you'll need to point to the consumer.properties and/or producer.properties file, which contains the needed configuration to work. You can find this files in the /opt/bitnami/kafka/config directory.

Use this to generate messages using a secure setup:

kafka-console-producer.sh --bootstrap-server 127.0.0.1:9092 --topic test --producer.config /opt/bitnami/kafka/config/producer.properties
Use this to consume messages using a secure setup

kafka-console-consumer.sh --bootstrap-server 127.0.0.1:9092 --topic test --consumer.config /opt/bitnami/kafka/config/consumer.properties
If you use other tools to use your Apache Kafka cluster, you'll need to provide the required information. You can find the required information in the files located at /opt/bitnami/kafka/config directory.

Inter-Broker communications
When deploying a Apache Kafka cluster with multiple brokers, inter broker communications can be configured with SASL or SASL_SSL using the following variables:

KAFKA_CFG_SASL_MECHANISM_INTER_BROKER_PROTOCOL: Apache Kafka inter broker communication protocol.
KAFKA_INTER_BROKER_USER: Apache Kafka inter broker communication user.
KAFKA_INTER_BROKER_PASSWORD: Apache Kafka inter broker communication password.
NOTE: When running in KRaft mode, KAFKA_CFG_SASL_MECHANISM_INTER_BROKER_PROTOCOL only supports PLAIN mechanism in Kafka version <= 3.4.

Control plane communications
When deploying a Apache Kafka cluster with multiple controllers in KRaft mode, controller communications can be configured with SASL or SASL_SSL using the following variables:

KAFKA_CFG_SASL_MECHANISM_CONTROLLER_PROTOCOL: Apache Kafka controllers communication protocol.
KAFKA_CONTROLLER_USER: Apache Kafka controllers communication user. Currently only PLAIN mechanism is supported.
KAFKA_CONTROLLER_PASSWORD: Apache Kafka controllers communication password.
NOTE: When running in KRaft mode, KAFKA_CFG_SASL_MECHANISM_CONTROLLER_PROTOCOL only supports PLAIN mechanism.

Apache Kafka SASL configuration
When configuring Apache Kafka listeners with SASL or SASL_SSL for communications with clients, you can provide your SASL credentials using this environment variables:

KAFKA_CLIENT_USERS: Apache Kafka client user. Default: user
KAFKA_CLIENT_PASSWORDS: Apache Kafka client user password. Default: bitnami
NOTE: When running in KRaft mode, only the first user:password pair will take effect, as KRaft mode does not support SCRAM mechanism yet.

Apache Kafka KRaft mode configuration
KRaft mode can be enabled by providing the following va

Note: the README for this image is longer than the DockerHub length limit of 25000, so has been trimmed. The full README can be found at https://github.com/bitnami/containers/blob/main/bitnami/kafka/README.md