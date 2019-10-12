package soldimet.service.expertos;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import soldimet.converter.UserConverter;
import soldimet.domain.Empleado;
import soldimet.domain.Persona;
import soldimet.domain.User;
import soldimet.repository.EmpleadoRepository;
import soldimet.repository.PersonaRepository;
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

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private UserConverter userConverver;

    public ExpertoUsuarios() {

    }

    public DTOEmpleado getEmpleadoActual() {
        try {
            return userConverver.convertirEntidadAModelo(this.getEmpleadoLogeado());

        } catch (

        Exception e) {
            e.printStackTrace();
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
            e.printStackTrace();
        }
        return null;
    }

}
