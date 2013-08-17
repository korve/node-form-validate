/**
 * User: https://github.com/korve/
 * Date: 11.08.13
 * Time: 14:25
 */

module.exports = {

	/**
	 * Merges source's properties into destination object
	 * @param source
	 * @param destination
	 * @returns {*}
	 */
	extend: function(source, destination)
	{
		if(typeof source !== 'object' || typeof destination != 'object')
		{
			return destination;
		}
		
		var extended = {};
		
		for(var prop in destination)
		{
			/**
			 * Check if property exists in destination and if it is a object.
			 * If this is true, merge the properties of the underlying object
			 * recursively.
			 */			
			if(prop in source)
			{
				if(typeof destination[prop] === 'object' && typeof source[prop] === 'object')
				{
					extended[prop] = this.extend(source[prop], destination[prop]);
				}
				else
				{
					extended[prop] = source[prop];
				}
			}
			else
			{
				extended[prop] = destination[prop];
			}
		}
		
		return extended;
	}
	
};