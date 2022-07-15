module MoveToTsTestsuite::RefMut {
    #[test_only]
    fun set_by_ref<T: drop>(dst: &mut T, val: T) {
        *dst = val;
    }
    #[test]
    fun test_set_by_ref() {
        let i = 0u64;
        set_by_ref(&mut i, 5);
        assert!(i == 5, 0);
    }
}
