package soldimet.service.expertos;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.converter.UserConverter;
import soldimet.domain.Empleado;
import soldimet.domain.Persona;
import soldimet.domain.User;
import soldimet.repository.extendedRepository.ExtendedEmpleadoRepository;
import soldimet.repository.extendedRepository.ExtendedPersonaRepository;
import soldimet.service.UserService;
import soldimet.service.dto.DTOEmpleado;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:44 p.m.
 */
@Service
@Transactional
public class ExpertoUsuarios {

    private final Logger log = LoggerFactory.getLogger(ExpertoUsuarios.class);

    @Autowired
    private ExtendedPersonaRepository personaRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ExtendedEmpleadoRepository empleadoRepository;

    @Autowired
    private UserConverter userConverver;

    public ExpertoUsuarios() {}

    public DTOEmpleado getEmpleadoActual() {
        try {
            return userConverver.convertirEntidadAModelo(this.getEmpleadoLogeado());
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return null;
    }

    public Empleado getEmpleadoLogeado() {
        try {
            Optional<User> user = userService.getUserWithAuthorities();

            if (user.isPresent()) {
                Persona persona = personaRepository.findByUser(user.get());
                return empleadoRepository.findByPersona(persona);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return null;
    }
}
