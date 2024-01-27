package io.anthony.postcode.postcode;


import java.util.Optional;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class PostcodeService {

	@Autowired
	private PostcodeRepository postcodeRepository;
	
	@Autowired 
	private ModelMapper modelMapper;
	
	public List<Postcode> getAll(){
		return this.postcodeRepository.findAll();
	}
	
	public Optional<Postcode> getById(Long id){
		return this.postcodeRepository.findById(id);
	}
	
	public Postcode createPostcode(PostcodeCreateDTO data) {
		Postcode newPostcode = modelMapper.map(data, Postcode.class);
		Postcode created = this.postcodeRepository.save(newPostcode);
		return created;
	}
	
	public boolean deleteById(Long id) {
		Optional<Postcode> foundPostcode = this.postcodeRepository.findById(id);
		if(foundPostcode.isPresent()) {
			this.postcodeRepository.delete(foundPostcode.get());
			return true;
		}
		return false;
	}
	
	public Optional<Postcode> updateById(Long id, PostcodeUpdateDTO data){
		Optional<Postcode> foundPostcode = this.getById(id);
		
		if(foundPostcode.isPresent()) {
			Postcode toUpdate = foundPostcode.get();
			
			modelMapper.map(data, toUpdate);
			Postcode updatedPostcode = this.postcodeRepository.save(toUpdate);
			return Optional.of(updatedPostcode);
		}
		return foundPostcode;
	}
	
}
