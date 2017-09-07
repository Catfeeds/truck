package com.hyhl.gotosea.core.rabbitmq.message;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.validation.Configuration;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.groups.Default;

import org.hibernate.validator.messageinterpolation.ParameterMessageInterpolator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.util.Assert;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hyhl.gotosea.core.rabbitmq.enm.ExchangeEnum;
import com.hyhl.gotosea.core.rabbitmq.enm.MqMessageEnum;

/**
 * MQ消息体
 * 
 * @author guan.sj
 */
public class MqMessage implements Serializable {
	private static final long serialVersionUID = -4088731646543475591L;
	private transient static Logger logger = LoggerFactory.getLogger(MqMessage.class);
	private String _exchange = ExchangeEnum.DEFAULT_EXCHANGE.getKey();
	private StringBuffer _key = new StringBuffer();
	private Map<String, String> _map = new HashMap<String, String>();
	private transient ObjectMapper _mapper = new ObjectMapper();
	private transient Validator _validator;

	private MqMessage() {
	}

	public static MqMessage newInstance() {
		return new MqMessage();
	}

	/**存入参数对象
	 * @param enm 存入对象时的key枚举
	 * @param obj 存入的对象
	 * @return
	 * @throws JsonProcessingException
	 */
	public MqMessage put(MqMessageEnum enm, Object obj) throws JsonProcessingException {
		_key.append(enm.getKey());
		_map.put(enm.getKey(), this.write(obj));
		return this;
	}

	/**取出参数对象
	 * @param enm 存入对象时的key枚举
	 * @return
	 * @throws Exception
	 */
	public Object get(MqMessageEnum enm) throws Exception {
		return get(enm, enm.getClazz());
	}

	/**取出参数对象
	 * @param enm 存入对象时的key枚举
	 * @param clazz 必须跟存入对象类型一致
	 * @return
	 * @throws Exception
	 */
	public <T> T get(MqMessageEnum enm, Class<T> clazz) throws Exception {
		return read(_map.get(enm.getKey()), clazz);
	}

	/**取出参数对象-并验证参数判空（基于validate注解）
	 * @param enm 存入对象时的key枚举
	 * @param clazz 必须跟存入对象类型一致
	 * @return
	 * @throws Exception
	 */
	public <T> T getAndValid(MqMessageEnum enm, Class<T> clazz) throws Exception {
		return getAndValid(enm, clazz, Default.class);
	}

	public <T> T getAndValid(MqMessageEnum enm, Class<T> clazz, Class<?> group) throws Exception {
		T read = read(_map.get(enm.getKey()), clazz);
		validateGroup(read, group);
		return read;
	}

	public String getExchange() {
		return this._exchange;
	}

	public MqMessage setExchange(String exchange) {
		this._exchange = exchange;
		return this;
	}

	public String getRouteKey() {
		return this._key.toString();
	}

	private String write(Object obj) throws JsonProcessingException {
		return _mapper.writeValueAsString(obj);
	}

	private <T> T read(String str, Class<T> clazz) throws Exception {
		try {
			Assert.notNull(str, "str is null");
			Assert.notNull(clazz, "clazz is null");
		} catch (IllegalArgumentException e) {
			logger.info(e.getMessage(), e);
			throw new AmqpRejectAndDontRequeueException(e);
		}
		return _mapper.readValue(str, clazz);
	}

	private <T> void validateGroup(T obj, Class<?> group) throws Exception {
		if(_validator==null)this._validator = getValidator();
		Set<ConstraintViolation<T>> set = _validator.validate(obj, group);
		if (null != set && set.size() > 0) {
			for (ConstraintViolation<T> cv : set) {
				logger.info(cv.toString(), cv);
				throw new AmqpRejectAndDontRequeueException(cv.getMessage());
			}
		}
	}

	private Validator getValidator() {
		final Configuration<?> cfg = Validation.byDefaultProvider().configure();
		cfg.messageInterpolator(new ParameterMessageInterpolator());
		return cfg.buildValidatorFactory().getValidator();
	}

	public String get_exchange() {
		return _exchange;
	}

	public void set_exchange(String _exchange) {
		this._exchange = _exchange;
	}

	public Map<String, String> get_map() {
		return _map;
	}

	public void set_map(Map<String, String> _map) {
		this._map = _map;
	}

	public StringBuffer get_key() {
		return _key;
	}

	public void set_key(StringBuffer _key) {
		this._key = _key;
	}

	@Override
	public String toString() {
		return "MqMessage [_exchange=" + _exchange + ", _key=" + _key.toString() + ", _map=" + _map.toString() + "]";
	}
}
