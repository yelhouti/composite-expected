package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.GeneratedByJHipster;
import com.mycompany.myapp.domain.PriceFormula;
import com.mycompany.myapp.repository.PriceFormulaRepository;
import com.mycompany.myapp.service.PriceFormulaService;
import com.mycompany.myapp.service.dto.PriceFormulaDTO;
import com.mycompany.myapp.service.mapper.PriceFormulaMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link PriceFormula}.
 */
@Service
@Transactional
@GeneratedByJHipster
public class PriceFormulaServiceImpl implements PriceFormulaService {

    private final Logger log = LoggerFactory.getLogger(PriceFormulaServiceImpl.class);

    private final PriceFormulaRepository priceFormulaRepository;

    private final PriceFormulaMapper priceFormulaMapper;

    public PriceFormulaServiceImpl(PriceFormulaRepository priceFormulaRepository, PriceFormulaMapper priceFormulaMapper) {
        this.priceFormulaRepository = priceFormulaRepository;
        this.priceFormulaMapper = priceFormulaMapper;
    }

    @Override
    public PriceFormulaDTO save(PriceFormulaDTO priceFormulaDTO) {
        log.debug("Request to save PriceFormula : {}", priceFormulaDTO);
        PriceFormula priceFormula = priceFormulaMapper.toEntity(priceFormulaDTO);
        priceFormula = priceFormulaRepository.save(priceFormula);
        return priceFormulaMapper.toDto(priceFormula);
    }

    @Override
    public PriceFormulaDTO partialUpdate(PriceFormulaDTO priceFormulaDTO) {
        log.debug("Request to partially update PriceFormula : {}", priceFormulaDTO);

        return priceFormulaRepository
            .findById(priceFormulaDTO.getId())
            .map(
                existingPriceFormula -> {
                    if (priceFormulaDTO.getFormula() != null) {
                        existingPriceFormula.setFormula(priceFormulaDTO.getFormula());
                    }

                    return existingPriceFormula;
                }
            )
            .map(priceFormulaRepository::save)
            .map(priceFormulaMapper::toDto)
            .get();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PriceFormulaDTO> findAll() {
        log.debug("Request to get all PriceFormulas");
        return priceFormulaRepository.findAll().stream().map(priceFormulaMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PriceFormulaDTO> findOne(Integer id) {
        log.debug("Request to get PriceFormula : {}", id);
        return priceFormulaRepository.findById(id).map(priceFormulaMapper::toDto);
    }

    @Override
    public void delete(Integer id) {
        log.debug("Request to delete PriceFormula : {}", id);
        priceFormulaRepository.deleteById(id);
    }
}
