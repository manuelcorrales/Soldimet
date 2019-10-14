package soldimet.service;

import soldimet.domain.SubCategoria;
import soldimet.repository.SubCategoriaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link SubCategoria}.
 */
@Service
@Transactional
public class SubCategoriaService {

    private final Logger log = LoggerFactory.getLogger(SubCategoriaService.class);

    private final SubCategoriaRepository subCategoriaRepository;

    public SubCategoriaService(SubCategoriaRepository subCategoriaRepository) {
        this.subCategoriaRepository = subCategoriaRepository;
    }

    /**
     * Save a subCategoria.
     *
     * @param subCategoria the entity to save.
     * @return the persisted entity.
     */
    public SubCategoria save(SubCategoria subCategoria) {
        log.debug("Request to save SubCategoria : {}", subCategoria);
        return subCategoriaRepository.save(subCategoria);
    }

    /**
     * Get all the subCategorias.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<SubCategoria> findAll() {
        log.debug("Request to get all SubCategorias");
        return subCategoriaRepository.findAll();
    }


    /**
     * Get one subCategoria by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<SubCategoria> findOne(Long id) {
        log.debug("Request to get SubCategoria : {}", id);
        return subCategoriaRepository.findById(id);
    }

    /**
     * Delete the subCategoria by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete SubCategoria : {}", id);
        subCategoriaRepository.deleteById(id);
    }
}
