package soldimet;

import soldimet.config.ApplicationProperties;
import soldimet.config.DefaultProfileUtil;
import soldimet.domain.Aplicacion;
import soldimet.domain.Motor;
import soldimet.repository.MotorRepository;
import io.github.jhipster.config.JHipsterConstants;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@ComponentScan
@EnableAutoConfiguration(exclude = { MetricFilterAutoConfiguration.class, MetricRepositoryAutoConfiguration.class })
@EnableConfigurationProperties({ LiquibaseProperties.class, ApplicationProperties.class })
@EnableDiscoveryClient
public class SoldimetApp {

    private static final Logger log = LoggerFactory.getLogger(SoldimetApp.class);

    private final Environment env;

    @Autowired
    private MotorRepository motorRepository;

    public SoldimetApp(Environment env) {
        this.env = env;
    }

    /**
     * Initializes Soldimet.
     * <p>
     * Spring profiles can be configured with a program arguments --spring.profiles.active=your-active-profile
     * <p>
     * You can find more information on how profiles work with JHipster on <a href="http://www.jhipster.tech/profiles/">http://www.jhipster.tech/profiles/</a>.
     */
    @PostConstruct
    public void initApplication() {
        Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
        if (activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT)
                && activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_PRODUCTION)) {
            log.error("You have misconfigured your application! It should not run "
                    + "with both the 'dev' and 'prod' profiles at the same time.");
        }
        if (activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT)
                && activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_CLOUD)) {
            log.error("You have misconfigured your application! It should not "
                    + "run with both the 'dev' and 'cloud' profiles at the same time.");
        }
    }

    /**
     * Main method, used to run the application.
     *
     * @param args the command line arguments
     * @throws UnknownHostException if the local host name could not be resolved into an address
     */
    public static void main(String[] args) throws UnknownHostException {
        SpringApplication app = new SpringApplication(SoldimetApp.class);
        DefaultProfileUtil.addDefaultProfile(app);
        Environment env = app.run(args).getEnvironment();
        String protocol = "http";
        if (env.getProperty("server.ssl.key-store") != null) {
            protocol = "https";
        }
        log.info(
                "\n----------------------------------------------------------\n\t"
                        + "Application '{}' is running! Access URLs:\n\t" + "Local: \t\t{}://localhost:{}\n\t"
                        + "External: \t{}://{}:{}\n\t"
                        + "Profile(s): \t{}\n----------------------------------------------------------",
                env.getProperty("spring.application.name"), protocol, env.getProperty("server.port"), protocol,
                InetAddress.getLocalHost().getHostAddress(), env.getProperty("server.port"), env.getActiveProfiles());
    }

    /*@PostConstruct
    private void initDatabase() {
        String pathDirectorio = "D:/Manu/Documents/Proyectos/Soldimet/Aplicaciones/";
        File directorio = new File(pathDirectorio);
        File[] archivos = directorio.listFiles();
        System.out.print("---------------------------------------------------------------------\n");
        for (File archivo : archivos) {
            String nombreArchivo = archivo.getName().replaceAll(".txt", "");
            String line;
            Motor motor = new Motor();
            motor.setMarcaMotor(nombreArchivo);

            Set<Aplicacion> aplicaciones = new HashSet<Aplicacion>();

            System.out.print("motor: "+motor.getMarcaMotor()+"\n");
            try {

                BufferedReader bufferreader = new BufferedReader(new FileReader(archivo));

                while ((line = bufferreader.readLine()) != null) {
                    //do whatever here
                    //line = bufferreader.readLine();
                    int longitud = line.length();
                    String nombreAplicacion = line.substring(0,longitud-2);
                    Integer numeroAplicacion = Integer.valueOf(line.substring(longitud-1));
                    Aplicacion aplicacion = new Aplicacion();
                    aplicacion.setNombreAplicacion(nombreAplicacion);
                    aplicacion.setNumeroGrupo(numeroAplicacion);
                    aplicaciones.add(aplicacion);
                    System.out.print("aplicacion: "+aplicacion.getNombreAplicacion()+"\n");
                    System.out.print("numero: "+aplicacion.getNumeroGrupo()+"\n");
                }
                bufferreader.close();

            } catch (FileNotFoundException ex) {
                ex.printStackTrace();
            } catch (IOException ex) {
                ex.printStackTrace();
            }

            motor.setAplicacions(aplicaciones);
            System.out.print("--------------------------COMMIT-----------------------------------\n");
            motorRepository.save(motor);

        }
    }*/
}
